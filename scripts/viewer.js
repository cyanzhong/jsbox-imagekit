exports.open = image => {

  const props = (() => {
    if (typeof image.imageWithScale === "function") {
      return {
        data: image
      }
    } else {
      return {
        image: image
      }
    }
  })();

  $ui.push({
    props: {
      clipsToSafeArea: true
    },
    views: [
      {
        type: "scroll",
        props: {
          zoomEnabled: true
        },
        layout: $layout.fill,
        views: [
          {
            type: "image",
            props: props,
            layout: $layout.fill
          }
        ]
      }
    ]
  });
}