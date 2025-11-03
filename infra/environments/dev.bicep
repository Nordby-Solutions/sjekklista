targetScope = 'subscription'

param subscriptionId string
param location string = 'westeurope'
param environment string = 'dev'

module app '../main.bicep' = {
  name: 'deploy-dev'
  scope: subscription(subscriptionId)
  params: {
    environment: environment
    location: location
  }
}

