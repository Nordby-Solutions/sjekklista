targetScope = 'resourceGroup'
param name string
param location string 
param sku string = 'Free'

resource swa 'Microsoft.Web/staticSites@2024-11-01' = {
  name: name
  location: location
  properties: {}
  sku: {
    name: sku
    tier: sku
  }
}
