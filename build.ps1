param([string] $env = "dev")
$source = "./src/config." + $env + ".js"
Copy-Item $source "./src/config.js"
Write-Host "Using configuration for environment: $env [$source]"