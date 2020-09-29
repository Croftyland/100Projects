import {getImages} from "./services/imagesService";

export default class Loader {
    constructor(onAssetsLoaded, appLoader) {
        this.loader = appLoader;
        getImages().then(response => {
            this.loadAssets(response);
            this.loader.load(onAssetsLoaded);
        });

    }

    loadAssets(images) {
            this.loader.add(images);
    }
}