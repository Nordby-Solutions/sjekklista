targetScope = 'subscription'
param name string
param location string

resource rg 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  name: name
  location: location
}

output name string = rg.name
