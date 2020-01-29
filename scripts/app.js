const viewer = require("./viewer");
const sample = $image("assets/sample.jpg");
const mask = $image("assets/mask.png");
const gif = $file.read("assets/sample.gif");

const options = [
  [
    {
      title: "original",
      handler: () => {
        open(sample);
      }
    },
    {
      title: "info",
      handler: () => {
        const info = $imagekit.info(sample);
        $quicklook.open({
          json: JSON.stringify(info)
        });
      }
    },
    {
      title: "grayscale",
      handler: () => {
        open($imagekit.grayscale(sample));
      }
    },
    {
      title: "invert",
      handler: () => {
        open($imagekit.invert(sample));
      }
    },
    {
      title: "sepia",
      handler: () => {
        open($imagekit.sepia(sample));
      }
    },
    {
      title: "adjustEnhance",
      handler: () => {
        open($imagekit.adjustEnhance(sample));
      }
    },
    {
      title: "adjustRedEye",
      handler: () => {
        open($imagekit.adjustRedEye(sample));
      }
    },
    {
      title: "adjustBrightness",
      handler: () => {
        open($imagekit.adjustBrightness(sample, 100));
      }
    },
    {
      title: "adjustContrast",
      handler: () => {
        open($imagekit.adjustContrast(sample, 100));
      }
    },
    {
      title: "adjustGamma",
      handler: () => {
        open($imagekit.adjustGamma(sample, 4));
      }
    },
    {
      title: "adjustOpacity",
      handler: () => {
        open($imagekit.adjustOpacity(sample, 0.5));
      }
    },
    {
      title: "blur",
      handler: () => {
        open($imagekit.blur(sample, 0));
      }
    },
    {
      title: "emboss",
      handler: () => {
        open($imagekit.emboss(sample, 0));
      }
    },
    {
      title: "sharpen",
      handler: () => {
        open($imagekit.sharpen(sample, 0));
      }
    },
    {
      title: "unsharpen",
      handler: () => {
        open($imagekit.unsharpen(sample, 0));
      }
    },
    {
      title: "detectEdge",
      handler: () => {
        open($imagekit.detectEdge(sample, 0));
      }
    },
    {
      title: "mask",
      handler: () => {
        open($imagekit.mask(sample, mask));
      }
    },
    {
      title: "reflect",
      handler: () => {
        open($imagekit.reflect(sample, 512, 0, 1));
      }
    },
    {
      title: "cropTo",
      handler: () => {
        const size = $size(256, 256);
        open($imagekit.cropTo(sample, size));
      }
    },
    {
      title: "scaleBy",
      handler: () => {
        open($imagekit.scaleBy(sample, 0.2));
      }
    },
    {
      title: "scaleTo",
      handler: () => {
        const size = $size(100, 100);
        open($imagekit.scaleTo(sample, size));
      }
    },
    {
      title: "scaleAspectFit",
      handler: () => {
        const size = $size(256, 100);
        open($imagekit.scaleAspectFit(sample, size));
      }
    },
    {
      title: "scaleAspectFill",
      handler: () => {
        const size = $size(256, 100);
        open($imagekit.scaleAspectFill(sample, size));
      }
    },
    {
      title: "rotate",
      handler: () => {
        open($imagekit.rotate(sample, Math.PI * 0.25));
      }
    },
    {
      title: "rotatePixels",
      handler: () => {
        open($imagekit.rotatePixels(sample, Math.PI * 0.25));
      }
    },
    {
      title: "flip",
      handler: () => {
        open($imagekit.flip(sample));
      }
    },
    {
      title: "concatenate",
      handler: () => {
        const images = [sample, mask, sample];
        open($imagekit.concatenate(images, 10));
      }
    },
    {
      title: "combine",
      handler: () => {
        open($imagekit.combine(sample, mask));
      }
    },
    {
      title: "rounded",
      handler: () => {
        open($imagekit.rounded(sample, 20));
      }
    }
  ],
  [
    {
      title: "original",
      handler: () => {
        open(gif)
      }
    },
    {
      title: "extractGIF",
      handler: async() => {
        const {images} = await $imagekit.extractGIF(gif);
        $quicklook.open({
          list: images.map(image => image.png)
        });
      }
    },
    {
      title: "makeGIF",
      handler: async() => {
        const images = [sample, mask];
        const durations = [0.5, 0.5];
        const data = await $imagekit.makeGIF(images, {
          durations: durations
        });
        open(data);
      }
    },
    {
      title: "makeVideo",
      handler: async() => {
        const data = await $imagekit.makeVideo(gif);
        $share.sheet([
          {
            "name": "video.mp4",
            "data": data
          }
        ]);
      }
    }
  ]
];

function open(image) {
  viewer.open(image);
}

exports.init = () => {

  $ui.render({
    views: [
      {
        type: "list",
        props: {
          data: [
            {
              title: "Image",
              rows: options[0].map(x => x.title)
            },
            {
              title: "GIF",
              rows: options[1].map(x => x.title)
            }
          ]
        },
        layout: $layout.fill,
        events: {
          didSelect: (sender, indexPath) => {
            const handler = options[indexPath.section][indexPath.row]["handler"];
            handler();
          }
        }
      }
    ]
  });
}