import { imageBrowserDownload } from './browser';

export let saveSVGtoBase64 = (svgElement) => {
    let serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const base64Data = btoa(unescape(encodeURIComponent(svgString)));

    return base64Data;
};

export let saveSVGtoFile = (svgElement) => {
    const base64Data = saveSVGtoBase64(svgElement);

    const dataURI = `data:image/svg+xml;base64,${base64Data}`;

    imageBrowserDownload(dataURI, 'screenshot.svg');
}

export let saveSVGtoPngBase64 = (svgElement) => {
    return new Promise((resolve, reject) => {
        const base64Data = saveSVGtoBase64(svgElement);
        const dataURI = `data:image/svg+xml;base64,${base64Data}`;

        let image = new Image();
        image.src = dataURI;

        image.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            let context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            let pngDataURI = canvas.toDataURL('image/png');
            console.log(pngDataURI);
            resolve(pngDataURI);
        }

        image.onerror = (err) => {
            reject(new Error('Image loading or conversion failed'));
        }
    });
}

export let saveSVGtoPngFile = (svgElement) => {
    saveSVGtoPngBase64(svgElement)
        .then((pngDataURI) => {
            imageBrowserDownload(pngDataURI, 'screenshot.png');
        })
        .catch((err) => {
            console.error(err);
        });
}

