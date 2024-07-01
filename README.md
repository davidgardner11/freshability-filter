# Freshability-Filter instructions

## Setup
The component requires two props in order for it to get the correct info from the Kohana app

`baseUrl`: the base url of the Kohana app
`authToken`: base64 encoded of current user's email

Example:
```
<FilterList :base-url="'http://f.local'" :auth-token="base64UserEmail"></FilterList>
```

## Getting the current filter set
The event `apply-filters` fires when the filters are set

Usage example
```
<FilterList @apply-filters="applyFilters" :base-url="'http://f.local'" :auth-token="base64UserEmail"></FilterList>
```
