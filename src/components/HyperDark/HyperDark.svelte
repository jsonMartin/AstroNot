<script lang="ts">
  ////////////////////////////////////////////////////////
  // StarField Source: https://jsfiddle.net/ditman/8Ffrw
  // Modifications: @jsonMartin
  ////////////////////////////////////////////////////////
  import { onDestroy, onMount } from "svelte";
  import { navbar } from "../../stores/layout";

  ///////////////////
  // StarField BEGIN
  ///////////////////
  const DEFAULT_SPEED = 11; // in %
  let renderFrame;
  let watchCanvas;
  let mounted = false; // Keep track of mounted state to allow running server-side and prevent race conditions

  /**
   * The stars in our starfield!
   * Stars coordinate system is relative to the CENTER of the canvas
   * @param  {number} x
   * @param  {number} y
   */

  const Star = function (x, y, maxSpeed) {
    this.x = x;
    this.y = y;
    this.slope = y / x; // This only works because our origin is always (0,0)
    this.opacity = 0;
    this.speed = Math.max(Math.random() * maxSpeed, 1);
  };

  /**
   * Compute the distance of this star relative to any other point in space.
   *
   * @param  {int} originX
   * @param  {int} originY
   *
   * @return {float} The distance of this star to the given origin
   */

  Star.prototype.distanceTo = function (originX, originY) {
    return Math.sqrt(
      Math.pow(originX - this.x, 2) + Math.pow(originY - this.y, 2),
    );
  };

  /**
   * Reinitializes this star's attributes, without re-creating it
   *
   * @param  {number} x
   * @param  {number} y
   *
   * @return {Star} this star
   */

  Star.prototype.resetPosition = function (x, y, maxSpeed) {
    Star.apply(this, arguments);
    return this;
  };

  /**
   * The BigBang factory creates stars (Should be called StarFactory, but that is
   * a WAY LESS COOL NAME!
   * @type {Object}
   */
  const BigBang = {
    /**
     * Returns a random star within a region of the space.
     *
     * @param  {number} minX minimum X coordinate of the region
     * @param  {number} minY minimum Y coordinate of the region
     * @param  {number} maxX maximum X coordinate of the region
     * @param  {number} maxY maximum Y coordinate of the region
     *
     * @return {Star} The random star
     */
    getRandomStar: function (minX, minY, maxX, maxY, maxSpeed) {
      var coords = BigBang.getRandomPosition(minX, minY, maxX, maxY);
      return new Star(coords.x, coords.y, maxSpeed);
    },

    /**
     * Gets a random (x,y) position within a bounding box
     *
     *
     * @param  {number} minX minimum X coordinate of the region
     * @param  {number} minY minimum Y coordinate of the region
     * @param  {number} maxX maximum X coordinate of the region
     * @param  {number} maxY maximum Y coordinate of the region
     *
     * @return {Object} An object with random {x, y} positions
     */
    getRandomPosition: function (minX, minY, maxX, maxY) {
      return {
        x: Math.floor(Math.random() * maxX + minX),
        y: Math.floor(Math.random() * maxY + minY),
      };
    },
  };

  /**
   * Constructor function of our starfield. This just prepares the DOM nodes where
   * the scene will be rendered.
   *
   * @param {string} canvasId The DOM Id of the <div> containing a <canvas> tag
   */
  const StarField = function (containerId) {
    this.container = document.getElementById(containerId);
    this.canvasElem = this.container.getElementsByTagName("canvas")[0];
    this.canvas = this.canvasElem.getContext("2d");

    this.play = true;

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.starField = [];
  };

  /**
   * Updates the properties for every star for the next frame to be rendered
   */
  StarField.prototype._updateStarField = function () {
    let i, star, randomLoc, increment;

    for (i = 0; i < this.numStars; i++) {
      star = this.starField[i];

      increment = Math.min(star.speed, Math.abs(star.speed / star.slope));
      star.x += star.x > 0 ? increment : -increment;
      star.y = star.slope * star.x;

      star.opacity += star.speed / 100;

      // Recycle star obj if it goes out of the frame
      if (
        Math.abs(star.x) > this.width / 2 ||
        Math.abs(star.y) > this.height / 2
      ) {
        //randomLoc = BigBang.getRandomPosition(
        //    -this.width / 2, -this.height / 2,
        //       this.width, this.height
        //);
        randomLoc = BigBang.getRandomPosition(
          -this.width / 10,
          -this.height / 10,
          this.width / 5,
          this.height / 5,
        );
        star.resetPosition(randomLoc.x, randomLoc.y, this.maxStarSpeed);
      }
    }
  };

  /**
   * Renders the whole starfield (background + stars)
   * This method could be made more efficient by just blipping each star,
   * and not redrawing the whole frame
   */
  StarField.prototype._renderStarField = function () {
    var i, star;
    // Background
    this.canvas.fillStyle = "rgba(0, 0, 0, .5)";
    this.canvas.fillRect(0, 0, this.width, this.height);
    // Stars
    for (i = 0; i < this.numStars; i++) {
      star = this.starField[i];
      this.canvas.fillStyle = "rgba(255, 255, 255, " + star.opacity + ")";
      this.canvas.fillRect(
        star.x + this.width / 2,
        star.y + this.height / 2,
        2,
        2,
      );
    }
  };

  /**
   * Function that handles the animation of each frame. Update the starfield
   * positions and re-render
   */

  StarField.prototype._renderFrame = function (elapsedTime) {
    if (!this.play) return;
    var timeSinceLastFrame = elapsedTime - (this.prevFrameTime || 0);

    renderFrame = window.requestAnimationFrame(this._renderFrame.bind(this));

    const MAX_FPS = 30;
    if (timeSinceLastFrame >= MAX_FPS || !this.prevFrameTime) {
      // Skip frames unless at least 30ms have passed since the last one
      this.prevFrameTime = elapsedTime;
      this._updateStarField();
      this._renderStarField();
    }
  };

  /**
   * Makes sure that the canvas size fits the size of its container
   */
  StarField.prototype._adjustCanvasSize = function (width, height) {
    // Set the canvas size to match the container ID (and cache values)
    this.width = this.canvasElem.width = width || this.container.offsetWidth;
    this.height = this.canvasElem.height =
      height || this.container.offsetHeight;
  };

  /**
   * This listener compares the old container size with the new one, and caches
   * the new values.
   */

  StarField.prototype._watchCanvasSize = function (elapsedTime) {
    var timeSinceLastCheck = elapsedTime - (this.prevCheckTime || 0),
      width,
      height;

    watchCanvas = window.requestAnimationFrame(
      this._watchCanvasSize.bind(this),
    );

    // Skip frames unless at least 333ms have passed since the last check
    // (Cap to ~3fps)
    if (timeSinceLastCheck >= 333 || !this.prevCheckTime) {
      this.prevCheckTime = elapsedTime;
      width = this.container.offsetWidth;
      height = this.container.offsetHeight;
      if (this.oldWidth !== width || this.oldHeight !== height) {
        this.oldWidth = width;
        this.oldHeight = height;
        this._adjustCanvasSize(width, height);
      }
    }
  };

  /**
   * Initializes the scene by resizing the canvas to the appropiate value, and
   * sets up the main loop.
   * @param {int} numStars Number of stars in our starfield
   */
  let renderFrame2;
  let watchCanvasSize;
  StarField.prototype._initScene = function (numStars) {
    var i;
    for (i = 0; i < this.numStars; i++) {
      this.starField.push(
        BigBang.getRandomStar(
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height,
          this.maxStarSpeed,
        ),
      );
    }

    // Intervals not stored because I don't plan to detach them later...
    renderFrame2 = window.requestAnimationFrame(this._renderFrame.bind(this));
    watchCanvasSize = window.requestAnimationFrame(
      this._watchCanvasSize.bind(this),
    );
  };

  StarField.prototype.remove = function () {
    this.play = false;
    window.cancelAnimationFrame(renderFrame2);
    window.cancelAnimationFrame(renderFrame);
    window.cancelAnimationFrame(watchCanvasSize);
    window.cancelAnimationFrame(watchCanvas);
  };

  /**
   * Kicks off everything!
   * @param {int} numStars The number of stars to render
   * @param {int} maxStarSpeed Maximum speed of the stars (pixels / frame)
   */

  StarField.prototype.render = function (numStars = 100, maxStarSpeed = 3) {
    this.numStars = numStars;
    this.maxStarSpeed = maxStarSpeed;

    this._initScene(this.numStars);
  };
  ///////////////////
  // StarField END
  ///////////////////
  const renderStars = (percent = DEFAULT_SPEED) => {
    const isHyperDark = JSON.parse(localStorage.getItem("hyperDark"));
    const isDark = localStorage.getItem("color-theme") === "dark";
    console.log(isDark);

    if (!isHyperDark || !isDark) {
      return;
    }

    if (window.starField) {
      console.log("Starfield exists, deleting");
      window.starField.remove();
      window.starField = null;
      delete window.starField;
    }

    window.starField = new StarField("fullScreen");

    const numStars =
      JSON.parse(localStorage.getItem("numStarsPercent")) || percent;

    const MULTIPLIER = numStars < 100 ? numStars * 2 : numStars * 4;
    document.getElementById("starfield-canvas").classList.remove("hidden");

    window.starField.render(numStars * MULTIPLIER, 3);
  };

  let hyperDark = false;
  let darkMode = false;
  let mutationObserver = null;

  function load() {
    console.log("Load Hyperadrk ran");
    // darkMode = document.documentElement.classList.contains("dark");
    // hyperDark = document.documentElement.classList.contains("hyperDark");
    if (!hyperDark) {
      if (window.starField) {
        window.starField.remove();
        window.starField = null;
        delete window.starField;
      }
    } else {
      renderStars();
    }
  }

  function addPageListeners() {
    mutationObserver = new MutationObserver(() => {
      console.log("loading hyperdark from HyperDark");

      hyperDark = document.documentElement.classList.contains("hyperDark");
      if (hyperDark) {
        load();
        renderStars();
      } else {
        if (window.starField) {
          window.starField.remove();
          window.starField = null;
          delete window.starField;
        }
      }
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    document.addEventListener("astro:after-swap", afterSwap);
  }

  onMount(() => {
    const hasHyperDarkLoadedBefore = JSON.parse(
      localStorage.getItem("hyperDarkLoaded"),
    );

    if (!hasHyperDarkLoadedBefore) {
      // If first time loading in browser, default Dark Mode & HyperDark to true
      localStorage.setItem("color-theme", "dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("hyperDark", "true");
      document.documentElement.classList.add("hyperDark");
    }

    localStorage.setItem("hyperDarkLoaded", "true");

    hyperDark = hasHyperDarkLoadedBefore
      ? JSON.parse(localStorage.getItem("hyperDark"))
      : true;

    addPageListeners();

    const isHyperDark = localStorage.getItem("hyperDark") === "true";
    if (isHyperDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("hyperDark");
    }

    setTimeout(() => {
      mounted = true;
      darkMode = document.documentElement.classList.contains("dark");

      if (darkMode && hyperDark) {
        // Wrap execution in setTimeout (0ms) to run last
        load();
      }
    }, 1);
  });

  const afterSwap = () => {
    console.log("HyperDark after swap");
    // addPageListeners();
    load();
  };

  $: {
    if (mounted) {
      if (!darkMode) {
        localStorage.setItem("hyperDark", "false");
        document.documentElement.classList.remove("hyperDark");
        navbar.setKey("transluscent", false);
      } else {
        navbar.setKey("transluscent", true);
      }
    }
  }

  onDestroy(() => {
    if (mounted) {
      if (window.starField) {
        window.starField.remove();
        window.starField = null;
        delete window.starField;
      }

      document.removeEventListener("astro:after-swap", afterSwap);

      if (mutationObserver) {
        console.log("Disconnecting mutation observer");
        mutationObserver.disconnect();
      }
    }
  });
</script>

<div id="fullScreen" class={`fixed z-[-1] h-full w-full`}>
  <canvas
    id="starfield-canvas"
    class={`${hyperDark ? "" : "hidden"} h-screen w-screen bg-[#000]`}
  ></canvas>
</div>
