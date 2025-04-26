# QRSmith - Android QR Code Library

QRSmith is a powerful and versatile Android library for generating advanced, customizable QR codes. It supports multiple styles, logos, backgrounds, and various error correction levels, making it an essential tool for developers looking to add unique QR code functionalities to their apps.

## Key Features

- **Multiple Styles**: Generate QR codes in **square**, **rounded**, or **hexagonal** styles.
- **Logo Integration**: Add logos with optional padding and background clearing.
- **Custom Backgrounds**: Use custom images or colors as QR code backgrounds.
- **Full Customization**: Adjust size, colors, dot size factors, quiet zones, and more.
- **Error Correction**: Supports error correction levels (L, M, Q, H) for data reliability.
- **Developer-Friendly API**: Easy-to-use interface with robust customization options.

## Sample QR Codes
<table>
    <tr>
        <td><img src="https://github.com/akanshSirohi/QRSmith/blob/master/samples/QR-1.jpg?raw=true" width="200" /></td>
        <td><img src="https://github.com/akanshSirohi/QRSmith/blob/master/samples/QR-2.jpg?raw=true" width="200" /></td>
        <td><img src="https://github.com/akanshSirohi/QRSmith/blob/master/samples/QR-3.jpg?raw=true" width="200" /></td>
        <td><img src="https://github.com/akanshSirohi/QRSmith/blob/master/samples/QR-4.jpg?raw=true" width="200" /></td>
    </tr>
    <tr>
        <td><img src="https://github.com/akanshSirohi/QRSmith/blob/master/samples/QR-5.png?raw=true" width="200" /></td>
        <td><img src="https://github.com/akanshSirohi/QRSmith/blob/master/samples/QR-6.png?raw=true" width="200" /></td>
    </tr>
</table>

## Installation

### Step 1: Add Repositories

Add the following to your root `settings.gradle`:

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

### Step 2: Add the Dependency

Include this in your module-level `build.gradle` file:

```groovy
dependencies {
    implementation 'com.github.akanshSirohi:QRSmith:1.1.0'
}
```

## Getting Started

### Basic Example

```java
import com.akansh.qrsmith.QRSmith;
import com.akansh.qrsmith.QRCodeOptions;
import android.graphics.Bitmap;

// Define the QR code content
String content = "https://example.com";

// Create QR code options
QRCodeOptions options = new QRCodeOptions();
options.width = 500;
options.height = 500;
options.foregroundColor = Color.BLACK;
options.backgroundColor = Color.WHITE;
options.style = QRSmith.QRCodeStyle.SQUARED;
options.quiteZone = 1; // Set quiet zone size

try {
    // Generate the QR code
    Bitmap qrCode = QRSmith.generateQRCode(content, options);
    // Use the generated QR code Bitmap as needed
} catch (Exception e) {
    e.printStackTrace();
}
```

### Advanced Example with Logo, Background, and Customizations

```java
import com.akansh.qrsmith.QRSmith;
import com.akansh.qrsmith.QRCodeOptions;
import android.graphics.Bitmap;

// Define the QR code content
String content = "https://example.com";

// Load your logo and background bitmaps
Bitmap logo = BitmapFactory.decodeResource(getResources(), R.drawable.logo);
Bitmap background = BitmapFactory.decodeResource(getResources(), R.drawable.background);

// Create QR code options
QRCodeOptions options = new QRCodeOptions();
options.width = 600;
options.height = 600;
options.foregroundColor = Color.BLACK;
options.backgroundColor = Color.WHITE;
options.style = QRSmith.QRCodeStyle.HEXAGONAL;
options.logo = logo;
options.background = background; // Set custom background
options.dotSizeFactor = 0.8f;
options.errorCorrectionLevel = QRSmith.QRErrorCorrectionLevel.Q;
options.quiteZone = 2; // Set quiet zone size

try {
    // Generate the QR code
    Bitmap qrCode = QRSmith.generateQRCode(content, options);
    // Use the generated QR code Bitmap as needed
} catch (Exception e) {
    e.printStackTrace();
}
```

## Customization Options

QRSmith offers extensive customization through the `QRCodeOptions` class:

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>width</code></td>
      <td>Width of the QR code in pixels</td>
      <td>500</td>
    </tr>
    <tr>
      <td><code>height</code></td>
      <td>Height of the QR code in pixels</td>
      <td>500</td>
    </tr>
    <tr>
      <td><code>foregroundColor</code></td>
      <td>Color of the QR code foreground</td>
      <td><code>Color.BLACK</code></td>
    </tr>
    <tr>
      <td><code>backgroundColor</code></td>
      <td>Color of the QR code background</td>
      <td><code>Color.WHITE</code></td>
    </tr>
    <tr>
      <td><code>style</code></td>
      <td>QR code style (<code>SQUARED</code>, <code>ROUNDED</code>, <code>HEXAGONAL</code>)</td>
      <td><code>SQUARED</code></td>
    </tr>
    <tr>
      <td><code>logo</code></td>
      <td>Bitmap for the logo to overlay on the QR code</td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td><code>dotSizeFactor</code></td>
      <td>Adjusts the size of dots</td>
      <td><code>0.8f</code></td>
    </tr>
    <tr>
      <td><code>errorCorrectionLevel</code></td>
      <td>Error correction level (<code>L</code>, <code>M</code>, <code>Q</code>, <code>H</code>)</td>
      <td><code>H</code></td>
    </tr>
    <tr>
      <td><code>clearLogoBackground</code></td>
      <td>Clears the background under the logo</td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>background</code></td>
      <td>Bitmap for the QR code background</td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td><code>logoPadding</code></td>
      <td>Padding around the logo</td>
      <td>0</td>
    </tr>
    <tr>
      <td><code>quiteZone</code></td>
      <td>Quiet zone size around the QR code</td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## Supported QR Code Styles

1. **Square Style**: The traditional QR code style.
2. **Rounded Style**: Uses circular dots for a softer appearance.
3. **Hexagonal Style**: Creates a hexagonal pattern for a unique, modern design.

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests to improve this library.

## License

QRSmith is licensed under the MIT License. See `LICENSE` for details.

---

Start generating stunning, customizable QR codes with QRSmith today and elevate your app's capabilities!