targetScope = 'subscription'

var location string = 'westeurope'
var environment string = 'prod'
var subscriptionId = subscription().subscriptionId

module app '../main.bicep' = {
  name: 'deploy-prod'
  scope: subscription(subscriptionId)
  params: {
    environment: environment
    location: location
  }
}

