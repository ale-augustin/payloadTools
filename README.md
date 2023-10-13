# PayloadPrettify

`PayloadPrettify`, part of the `payloadTools` package, streamlines the process for developers and analysts working with payload formats like .dat, .cxml, and .idoc. With just a few actions, users can transform these payloads into standardized, readable XML formats directly within Visual Studio Code.

## Features

- **Payload to Prettified XML**: 
  - Easily convert varying payload formats into a standardized and reader-friendly XML.
  - The feature first linearizes the XML for improved manageability and then applies thorough XML formatting.

  ![Demonstration](https://github.com/ale-augustin/payloadTools/assets/3483555/f9b91979-84d8-407b-b212-db6568b0330d)


## Requirements

- **XML Tools Dependency**: 
  - For the optimal functionality of this extension, the installation of [XML Tools](https://marketplace.visualstudio.com/items?itemName=DotJoshJohnson.xml) is mandatory. 
  - Should you not have it installed, upon installing `PayloadPrettify`, VS Code will prompt you for its installation.

## Extension Settings

As of now, there aren't any user-specific settings required for this extension. All its features are designed to work straight out of the box.

## Known Issues

- **XML Tools Dependency**: 
  - The proper functioning of `PayloadPrettify` hinges on the continued installation of XML Tools. 
  - For any issues arising related to XML formatting, ensure XML Tools remains active and properly functioning.

## Release Notes

### Version 1.0.0

- Initial release of `PayloadPrettify`.
- Introduced features:
  - Transformation of payload files into standardized XML formats.
  - Established dependency on XML Tools for enhanced XML formatting.
