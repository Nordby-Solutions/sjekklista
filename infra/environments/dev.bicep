targetScope = 'subscription'

var location string = 'westeurope'
var environment string = 'dev'
var subscriptionId = subscription().subscriptionId

module app '../main.bicep' = {
  name: 'deploy-dev'
  scope: subscription(subscriptionId)
  params: {
    environment: environment
    location: location
  }
}

