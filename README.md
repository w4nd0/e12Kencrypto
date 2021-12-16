# Kencrypto

Seguindo as tendências do mercado, queremos fazer a criação de uma plataforma de carteira digital com suporte a criptomoedas. Nessa plataforma os usuários poderão ter diversas criptomoedas e fazer conversões entre uma e outra.

Esta entrega, portanto, consiste na criação de uma pequena biblioteca em TypeScript que lidará com a busca e tratamento das informações de cotação e conversão das moedas.

### Instalação

```
$ npm install k3ncrypt0

# ou

$ yarn add k3ncrypt0
```

### Importando a lib

```
import { Kencrypto } from "k3ncrypt0";

```

### Usando a lib

Primeiramente devemos configurar a nossa API key:

```
const k3ncrypt0 = new Kencrypto();

k3ncrypt0.apiKey = "Sua API key vai aqui"
```

### Métodos

**Cotação Atual**

```
const quotes_data = k3ncrypt0.quotes(["BTC"])
```

**Conversão de Preço**

```
const quotes_data = k3ncrypt0.conversion('BTC', 0.005, ['ETH'])
```
