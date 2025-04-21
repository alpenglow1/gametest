export class AssetManager {
  constructor() {
    this.images = {};
    this.sounds = {};

    // map of all the levels and their background images
    this.levelBackgrounds = {
      1: "Map001.png",
      2: "Map002.png",
      3: "Map003.png",
    };
  }

  preload() {
    // background image
    this.images["mainBg"] = loadImage("./assets/scene/Home3.jpg");

    // sounds
    this.sounds["menuMusic"] = loadSound("./assets/Cute and chu-2 byo.mp3");
    this.sounds["bgMusic1"] = loadSound("./assets/scene/one.mp3");
    this.sounds["bgMusic2"] = loadSound("./assets/scene/wheelie.mp3");
    this.sounds["bgMusic3"] = loadSound(
      "./assets/scene/Simple - 4 (Winter).mp3"
    );

    this.sounds["click"] = loadSound("./assets/scene/click.mp3");

    this.sounds["boxDrop"] = loadSound("./assets/scene/box-drop.mp3");

    this.sounds["boxPick"] = loadSound("./assets/scene/box-pick.ogg");

    this.sounds["collision"] = loadSound("./assets/scene/collision.mp3");

    this.sounds["levelWin"] = loadSound("./assets/scene/level-win.mp3");
    this.sounds["levelFail"] = loadSound("./assets/scene/level-fail.mp3");

    // player images
    this.images["player1"] = loadImage("./assets/Character1_Walking.png");
    this.images["player2"] = loadImage("./assets/Character2_Walking.png");

    // Load left-facing walking image
    loadImage("./assets/character 1/Character1_Walking.png", (img) => {
      img.loadPixels();
      // Remove white background
      for (let i = 0; i < img.pixels.length; i += 4) {
        // If the pixel is white or close to white, make it completely transparent
        if (
          img.pixels[i] > 240 &&
          img.pixels[i + 1] > 240 &&
          img.pixels[i + 2] > 240
        ) {
          img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
        }
      }
      img.updatePixels();
      this.images["player1Walking"] = img; // Walking image
      // Save original aspect ratio for comparison
      this.images["player1WalkingRatio"] = {
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
      };
    });

    // Load right-facing image
    loadImage("./assets/character 1/Character1_Side_View.png", (img) => {
      img.loadPixels();
      // Remove white background
      for (let i = 0; i < img.pixels.length; i += 4) {
        // If the pixel is white or close to white, make it completely transparent
        if (
          img.pixels[i] > 240 &&
          img.pixels[i + 1] > 240 &&
          img.pixels[i + 2] > 240
        ) {
          img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
        }
      }
      img.updatePixels();
      this.images["player1SideView"] = img; // Right-facing image
      // Save original aspect ratio for correct rendering
      this.images["player1SideViewRatio"] = {
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
      };
    });

    // Load character 2 left-facing walking image
    loadImage("./assets/character 2/Character2_Walking.png", (img) => {
      img.loadPixels();
      // Remove white background
      for (let i = 0; i < img.pixels.length; i += 4) {
        // If the pixel is white or close to white, make it completely transparent
        if (
          img.pixels[i] > 240 &&
          img.pixels[i + 1] > 240 &&
          img.pixels[i + 2] > 240
        ) {
          img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
        }
      }
      img.updatePixels();
      this.images["player2Walking"] = img; // Walking image
      // Save original aspect ratio
      this.images["player2WalkingRatio"] = {
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
      };
    });

    // Load character 2 right-facing image
    loadImage("./assets/character 2/Character2_Side_View.png", (img) => {
      img.loadPixels();
      // Remove white background
      for (let i = 0; i < img.pixels.length; i += 4) {
        // If the pixel is white or close to white, make it completely transparent
        if (
          img.pixels[i] > 240 &&
          img.pixels[i + 1] > 240 &&
          img.pixels[i + 2] > 240
        ) {
          img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
        }
      }
      img.updatePixels();
      this.images["player2SideView"] = img; // Right-facing image
      // Save original aspect ratio
      this.images["player2SideViewRatio"] = {
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
      };
    });

    // Load lying down image and process transparency
    loadImage("./assets/character 1/Character1_Lying_Down.png", (img) => {
      img.loadPixels();
      // Remove white background
      for (let i = 0; i < img.pixels.length; i += 4) {
        // If the pixel is white or close to white, make it completely transparent
        if (
          img.pixels[i] > 240 &&
          img.pixels[i + 1] > 240 &&
          img.pixels[i + 2] > 240
        ) {
          img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
        }
      }
      img.updatePixels();
      this.images["player1Lying"] = img;
    });

    // Load character 2 lying down image and process transparency
    loadImage("./assets/character 2/Character2_Lying_Down.png", (img) => {
      img.loadPixels();
      // Remove white background
      for (let i = 0; i < img.pixels.length; i += 4) {
        // If the pixel is white or close to white, make it completely transparent
        if (
          img.pixels[i] > 240 &&
          img.pixels[i + 1] > 240 &&
          img.pixels[i + 2] > 240
        ) {
          img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
        }
      }
      img.updatePixels();
      this.images["player2Lying"] = img;
    });

    // Load standing with cargo image and process transparency
    loadImage(
      "./assets/character 1/Character1_Standing_With_Cargo.png",
      (img) => {
        img.loadPixels();
        // Remove white background
        for (let i = 0; i < img.pixels.length; i += 4) {
          // If the pixel is white or close to white, make it completely transparent
          if (
            img.pixels[i] > 240 &&
            img.pixels[i + 1] > 240 &&
            img.pixels[i + 2] > 240
          ) {
            img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
          }
        }
        img.updatePixels();
        this.images["player1WithCargo"] = img;
      }
    );

    // Load walking with cargo image and process transparency
    loadImage(
      "./assets/character 1/Character1_Walking_With_Cargo.png",
      (img) => {
        img.loadPixels();
        // Remove white background
        for (let i = 0; i < img.pixels.length; i += 4) {
          // If the pixel is white or close to white, make it completely transparent
          if (
            img.pixels[i] > 240 &&
            img.pixels[i + 1] > 240 &&
            img.pixels[i + 2] > 240
          ) {
            img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
          }
        }
        img.updatePixels();
        this.images["player1WalkingWithCargo"] = img;
      }
    );

    // Load character 2 standing with cargo image and process transparency
    loadImage(
      "./assets/character 2/Character2_Standing_With_Cargo.png",
      (img) => {
        img.loadPixels();
        // Remove white background
        for (let i = 0; i < img.pixels.length; i += 4) {
          // If the pixel is white or close to white, make it completely transparent
          if (
            img.pixels[i] > 240 &&
            img.pixels[i + 1] > 240 &&
            img.pixels[i + 2] > 240
          ) {
            img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
          }
        }
        img.updatePixels();
        this.images["player2WithCargo"] = img;
      }
    );

    // Load character 2 walking with cargo image and process transparency
    loadImage(
      "./assets/character 2/Character2_Walking_With_Cargo.png",
      (img) => {
        img.loadPixels();
        // Remove white background
        for (let i = 0; i < img.pixels.length; i += 4) {
          // If the pixel is white or close to white, make it completely transparent
          if (
            img.pixels[i] > 240 &&
            img.pixels[i + 1] > 240 &&
            img.pixels[i + 2] > 240
          ) {
            img.pixels[i + 3] = 0; // Set alpha channel to 0 (completely transparent)
          }
        }
        img.updatePixels();
        this.images["player2WalkingWithCargo"] = img;
      }
    );

    // item images
    this.images["cargo1"] = loadImage("./assets/delivery-box-45.png");
    //car images
    this.images["n-blueBus"] = loadImage("./assets/n-blue-bus.svg");
    this.images["n-darkBluesedan"] = loadImage("./assets/n-darkBlue-sedan.svg");
    this.images["n-whiteAmbulance"] = loadImage(
      "./assets/n-white-ambulance.svg"
    );
    this.images["n-yellowBus"] = loadImage("./assets/n-yellow-bus.svg");
    this.images["s-redFireEngine"] = loadImage("./assets/s-red-fireEngine.svg");
    this.images["s-darkBlueVan"] = loadImage("./assets/s-darkBlue-van.svg");
    this.images["s-greySaloon"] = loadImage("./assets/s-grey-saloon.svg");
    this.images["s-redPoliceCar"] = loadImage("./assets/s-red-policeCar.svg");
    this.images["s-whiteSaloon"] = loadImage("./assets/s-white-saloon.svg");
    this.images["s-whiteSaloonWindow"] = loadImage(
      "./assets/s-white-saloon-topWindow.svg"
    );
    this.images["s-yellowPoliceCar"] = loadImage(
      "./assets/s-yellow-policeCar.svg"
    );

    // cargo images
    this.images["cargoUncollected"] = loadImage(
      "./assets/cargo/delivery-box-45.png"
    );
    // delivery zone images
    this.images["cargoBase"] = loadImage(
      "./assets/cargo/overlook-base-column.png"
    );

    //volume images
    this.images["volumeOn"] = loadImage("./assets/speaker_normal.svg");
    this.images["volumeOff"] = loadImage("./assets/speaker-off_normal.svg");
    //pause image
    this.images["pause"] = loadImage("./assets/pause-button_normal.svg");
  }

  // loadLevelBackground(level) {
  //   const bgKey = `level${level}Bg`;

  //   // if bg image is already loaded, return true
  //   if (this.images[bgKey]) {
  //     return true;
  //   }

  //   const bgFileName = this.levelBackgrounds[level];
  //   if (!bgFileName) {
  //     console.error(`Failed to load level ${level} background`);
  //     return false;
  //   }

  //   // load bg image
  //   console.log(`Loading level ${level} background: ${bgFileName}`);

  //   const imageLoaded = (img) => {
  //     this.images[bgKey] = img;
  //   }

  //   const imageError = (err) => {
  //     console.error(`Failed to load level ${level} background: ${bgFileName}`);
  //   }

  //   loadImage(`./assets/scene/${bgFileName}`, imageLoaded, imageError);

  //   // return false to indicate that bg image is not yet loaded
  //   return false;
  // }
  loadLevelBackground(level) {
    const bgKey = `level${level}Bg`;

    // if bg image is already loaded, return resolved Promise
    if (this.images[bgKey]) {
      return Promise.resolve(true);
    }

    const bgFileName = this.levelBackgrounds[level];
    if (!bgFileName) {
      console.error(`Failed to load level ${level} background`);
      return Promise.resolve(false);
    }

    console.log(`Loading level ${level} background: ${bgFileName}`);

    // return Promise to indicate that bg image is not yet loaded
    return new Promise((resolve) => {
      loadImage(
        `./assets/scene/${bgFileName}`,
        (img) => {
          this.images[bgKey] = img;
          resolve(true);
        },
        (err) => {
          console.error(
            `Failed to load level ${level} background: ${bgFileName}`,
            err
          );
          resolve(false);
        }
      );
    });
  }

  getLevelBackground(level) {
    return this.images[`level${level}Bg`];
  }

  getImage(name) {
    return this.images[name] || null;
  }

  getSound(name) {
    return this.sounds[name] || null;
  }
}
