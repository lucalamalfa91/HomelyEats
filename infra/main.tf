provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "foodapp" {
  name     = "foodapp-rg"
  location = "West Europe"
}

resource "azurerm_cosmosdb_account" "cosmos" {
  name                = "foodapp-cosmos"
  location            = azurerm_resource_group.foodapp.location
  resource_group_name = azurerm_resource_group.foodapp.name
  offer_type          = "Standard"
  kind                = "MongoDB"
  geo_location {
    location          = azurerm_resource_group.foodapp.location
    failover_priority = 0
  }
  consistency_policy {
    consistency_level = "Session"
  }
  enable_free_tier = true
  capabilities {
    name = "EnableMongo"
  }
}

resource "azurerm_storage_account" "sa" {
  name                     = "foodappstorageacc"
  resource_group_name      = azurerm_resource_group.foodapp.name
  location                 = azurerm_resource_group.foodapp.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_function_app" "func" {
  name                       = "foodapp-api"
  location                   = azurerm_resource_group.foodapp.location
  resource_group_name        = azurerm_resource_group.foodapp.name
  storage_account_name       = azurerm_storage_account.sa.name
  storage_account_access_key = azurerm_storage_account.sa.primary_access_key
  os_type                    = "linux"
  runtime_stack              = "node"
  version                    = "~18"
  app_settings = {
    COSMOS_CONNECTION = "<to-fill>"
    STRIPE_SECRET     = "<to-fill>"
  }
}
