/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const VaultsLazyImport = createFileRoute('/vaults')()
const InvestorsLazyImport = createFileRoute('/investors')()
const IndexLazyImport = createFileRoute('/')()
const VaultAddressLazyImport = createFileRoute('/vault/$address')()
const ProtocolTimeseriesLazyImport = createFileRoute('/protocol/timeseries')()
const InvestorAddressLazyImport = createFileRoute('/investor/$address')()

// Create/Update Routes

const VaultsLazyRoute = VaultsLazyImport.update({
  path: '/vaults',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/vaults.lazy').then((d) => d.Route))

const InvestorsLazyRoute = InvestorsLazyImport.update({
  path: '/investors',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/investors.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const VaultAddressLazyRoute = VaultAddressLazyImport.update({
  path: '/vault/$address',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/vault.$address.lazy').then((d) => d.Route),
)

const ProtocolTimeseriesLazyRoute = ProtocolTimeseriesLazyImport.update({
  path: '/protocol/timeseries',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/protocol.timeseries.lazy').then((d) => d.Route),
)

const InvestorAddressLazyRoute = InvestorAddressLazyImport.update({
  path: '/investor/$address',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/investor.$address.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/investors': {
      preLoaderRoute: typeof InvestorsLazyImport
      parentRoute: typeof rootRoute
    }
    '/vaults': {
      preLoaderRoute: typeof VaultsLazyImport
      parentRoute: typeof rootRoute
    }
    '/investor/$address': {
      preLoaderRoute: typeof InvestorAddressLazyImport
      parentRoute: typeof rootRoute
    }
    '/protocol/timeseries': {
      preLoaderRoute: typeof ProtocolTimeseriesLazyImport
      parentRoute: typeof rootRoute
    }
    '/vault/$address': {
      preLoaderRoute: typeof VaultAddressLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  InvestorsLazyRoute,
  VaultsLazyRoute,
  InvestorAddressLazyRoute,
  ProtocolTimeseriesLazyRoute,
  VaultAddressLazyRoute,
])

/* prettier-ignore-end */
