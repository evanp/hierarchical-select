# hierarchical-select

This is a proof-of-concept for a user-interface pattern we have in our OpenClimate project. I wanted to consider the pattern in isolation, so I broke it out into a separate project.

## License

[CCO](https://creativecommons.org/publicdomain/zero/1.0/) You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission. 

## How it works

You can select a country from the box at the left. This will make the country the selected geographical item (seen in the list on the bottom) and load a list of regions in the central box.

Selecting a region will make the region the selected item (again, seen in the list) and load a list of cities.

Selecting a city will make it the selected item.

The selectors for smaller geographical units (region, city) are disabled until a bigger geographical unit is selected.

Changing the selection for a larger geographical unit when a smaller one is selected will clear the box and make the larger unit the selected one.

## Differences

- This project uses [React Bootstrap](https://react-bootstrap.github.io/) as a UI framework, so I didn't have to extract all the components from the custom framework used by OpenClimate.

- This project uses [Geonames](https://geonames.org/) to provide geographical data.

- This project uses a [datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) to provide the selected items.