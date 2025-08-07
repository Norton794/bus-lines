# 🚍 Bus-Lines

Aplicação web minimalista e responsiva para consulta de horários de ônibus urbanos da cidade de **Lins - SP**.

> **Objetivo**: Oferecer à população uma ferramenta simples, leve e acessível para consultar os horários dos ônibus urbanos, com foco em usabilidade, mobilidade e acesso direto a informações públicas úteis.

---

## 🌐 Visão Geral

O projeto **Bus-Lines** visa facilitar o acesso aos horários de transporte coletivo, permitindo que qualquer usuário encontre rapidamente os horários disponíveis por **linha** e por **dia da semana** — com base em **sua localização atual** ou **linha escolhida manualmente**.

---

## 🧭 Funcionalidades Principais

- **Geolocalização**
  - Sugestão automática da linha de ônibus mais próxima.
  - Alternativa manual via seleção de linha.
  
- **Filtragem por Dia da Semana**
  - Dias Úteis
  - Sábados
  - Domingos/Feriados

- **Exibição dos Horários**
  - Tabela ou cards com os horários de cada linha.
  - Lista com as paradas de cada linha e coordenadas de cada parada.

---

## 🖥️ Tecnologias Utilizadas

| Camada         | Tecnologia                         |
|----------------|------------------------------------|
| Frontend       | TypeScript, React e Shadcn-ui |
| Geolocalização | `navigator.geolocation`            |
| Banco de Dados | PostgreSQL via [Supabase](https://supabase.com/) |

---

## 🗂 Estrutura do Banco de Dados (PostgreSQL/Supabase)

O projeto utiliza o **PostgreSQL** no Supabase. A estrutura básica contempla:

- `bus_lines`: informações sobre cada linha de ônibus
- `bus_stops`: paradas ordenadas de cada linha
- `schedules`: horários das linhas, por dia da semana

---

## ⚡ Iniciativa

Este projeto foi criado como uma solução simples e direta para moradores e visitantes da cidade de **Lins - SP**, oferecendo uma alternativa prática aos PDFs tradicionalmente divulgados. O **Bus-Lines** é um exemplo de como dados públicos podem ser reaproveitados para criar ferramentas úteis à comunidade.

---

## 🚧 Status

- [x] Banco de dados estruturado no Supabase
- [x] Layout responsivo e minimalista
- [x] Suporte a geolocalização
- [ ] Estimativa de horário de chegada em cada ponto (não sei se é possível)

---

## 📜 Licença

Este projeto é open-source e pode ser reutilizado conforme os termos da [MIT License](LICENSE).

---

## 🙋‍♂️ Contribuindo

Pull requests são bem-vindos! Sinta-se à vontade para sugerir melhorias ou funcionalidades adicionais. Qualquer ajuda para expandir o projeto será muito bem recebida — especialmente por quem depende diariamente do transporte público.

---

