
Set-Service sqlbrowser -StartupType auto
Start-Service sqlbrowser

[reflection.assembly]::LoadWithPartialName("Microsoft.SqlServer.Smo") | Out-Null
[reflection.assembly]::LoadWithPartialName("Microsoft.SqlServer.SqlWmiManagement") | Out-Null

$wmi = New-Object('Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer')
$tcp = $wmi.GetSmoObject("ManagedComputer[@Name='${env:computername}']/ServerInstance[@Name='SQL2016']/ServerProtocol[@Name='Tcp']")
$tcp.IsEnabled = $true
$tcp.Alter()


$config = @{
    instanceName = "SQL2016"
    dialect = "mssql"
    host = "localhost"
    username = "sa"
    password = "Password12!"
    port = 1433
    dialectOptions = @{
      requestTimeout = 25000
      cryptoCredentialsDetails = @{
        ciphers = "RC4-MD5"
      }
    }
    pool = @{
      max = 5
      min = 0
      idle = 10000
    }
  
}




$json = $config | ConvertTo-Json -Depth 3 -Compress

# Create sequelize_test database
sqlcmd -S "(local)" -U "sa" -P "Password12!" -d "master" -Q "CREATE DATABASE [seq_db];"

# cannot use Out-File because it outputs a BOM
[IO.File]::WriteAllLines((Join-Path $pwd "test\config\mssql.json"), $json)