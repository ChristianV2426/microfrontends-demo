# Microfrontend Architecture Demo

A demonstration of microfrontend architecture using **React** and **Vue** with **Module Federation** and cross-application communication via custom browser events.

## Project Structure

```
desarrollo/
├── host-app/          # React host application (loads microfrontends)
├── reactmf-app/       # React microfrontend (word list app)
└── vuemf-app/         # Vue microfrontend (word list app)
```

## Architecture

- **host-app**: Main React application that loads and orchestrates both microfrontends
- **reactmf-app**: Standalone React application exposed as a microfrontend via Module Federation
- **vuemf-app**: Standalone Vue application exposed as a microfrontend via Module Federation

