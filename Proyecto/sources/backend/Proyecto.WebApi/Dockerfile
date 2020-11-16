FROM  mcr.microsoft.com/dotnet/core/runtime:2.2 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["Proyecto.WebApi/Proyecto.WebApi.csproj", "Proyecto.WebApi/"]
RUN dotnet restore "Proyecto.WebApi/Proyecto.WebApi.csproj"
COPY . .
WORKDIR "/src/Proyecto.WebApi"
RUN dotnet build "Proyecto.WebApi.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Proyecto.WebApi.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Proyecto.WebApi.dll"]