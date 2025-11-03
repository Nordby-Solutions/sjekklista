targetScope = 'subscription'
param environment string
param location string = 'westeurope'

var rgName = 'sjekklista-${environment}-rg'
var appName = 'sjekklista-${environment}-app'

module rg './modules/resource-group.bicep' = {
  name: 'rg'
  params: {
    name: rgName
    location: location
  }
}

module appSwa './modules/static-web-app.bicep' = {
  name: 'swa'
  scope: resourceGroup(rgName)
  params: {
    name: appName
    location: location
  }
}
