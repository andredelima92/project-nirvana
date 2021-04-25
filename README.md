# Tecnologias utilizadas

## Frontend
 - ReactJs
 - NextJs
 - Yarn ou NPM

## Backend (PHP) (opcional)
 - PHP 7.4
 - Laravel 8
 - Composer

## Backend (Dotnet) (opcional)
 - DotNet SDK 3.1
 - dotnet ef (para migrations)
 - dotnet CLI

## Database
 - Sql Server

# Configuração

## *Backend - Dotnet*
<p>Acessar a pasta server</p>
<p>Configura o arquivo <b>appsettings.json</b> com o acesso ao banco de dados na linha na propriedade <b>TravelConnection</b></p>
<p>Rode o seguinte comando para rodar as migration e criar o banco de dados com as tabelas</p>

`dotnet ef database update`

<p>Inicie o servidor com o seguinte comando</p>

`dotnet run`

<i>Obs: Utilizar somente a rota <b>http</b></i>

## *Frontend*
<p>Acessar a pasta frontend e instalar as dependencias:</p>

`yarn` ou `npm install`

<p>Configurar o arquivo `.env`, colocar no BASE_URL o endereço do backend</p>

<p>Para iniciar a aplicação no frontend rode o seguinte comando:</p>

`yarn dev` ou `npm run dev`

<p>Agora é só acessar o navegador com a rota indicada pelo react, ex: http:127.0.0.1:3000</p>

## Caso queira usar o servidor com PHP ao em vez do dotnet siga os passos abaixo
  - Sera necessário instalar o driver do banco SqlServer

`https://docs.microsoft.com/pt-br/sql/connect/php/loading-the-php-sql-driver?view=sql-server-ver15`

 - Também é necessário que o composer esteja instalado.

 <p>Acesse a pasta phpServer e rode o seguinte comando</p>

`composer install`

 <p>Feito isso, copie o arquivo <b>.env.example</b> e cole no mesmo diretório com o nome <b>.env</b></p>
 <p>Configure o arquivo com os dados de acesso ao banco de dados</p>
 
 
 <p>Crie o banco de dados no Sql Server</p>
 <p>Rode o seguinte comando para as tabelas</p>
 
 `php artisan migrate`
 
 <p>Agora inicie o servidor com o seguinte comando</p>
 
 `php artisan serve`
 
