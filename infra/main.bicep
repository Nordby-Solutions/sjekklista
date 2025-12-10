targetScope = 'subscription'
param environment string
param location string = 'westeurope'

var rgName = 'sjekklista-${environment}-rg'
var appName = 'sjekklista-${environment}-app'
var landingName = 'sjekklista-${environment}-landing'


module rg './modules/resource-group.bicep' = {
  name: 'rg'
  params: {
    name: rgName
    location: location
  }
}

module landingSwa './modules/static-web-app.bicep' = {
  name: 'swa-landing'
  scope: resourceGroup(rgName)
  params: {
    name: landingName
    location: location
  }
}


module appSwa './modules/static-web-app.bicep' = {
  name: 'swa-app'
  scope: resourceGroup(rgName)
  params: {
    name: appName
    location: location
  }
}
