Get on-demand webcam pictures via `navigator.getUserMedia()`.

Check [example](.)

## instantiation

```html
<script type="text/javascript" src="booth.js"></script>
```

```javascript
var api = booth({
	dims[320, 240], // width and height, in pixels
	onReadyFail: function(err) {} // returns null when ready or error if error occurred
})
```

## public API

```javascript
api.isReady() // returns true if ready to take pictures, that is feature supported and user accepted permissions

api.takePicture() // returns a base64 image
```
