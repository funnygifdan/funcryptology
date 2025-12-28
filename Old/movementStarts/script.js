const scenes = {
  outside1: 'outside1.jpg',
  outside2: 'outside2.jpg',
  inside1: 'inside1.jpg',
  inside2: 'inside2.jpg',
};

let currentScene = '';

function setScene(name) {
  const bgLayer = document.getElementById('bgLayer');
  if (scenes[name] && name !== currentScene) {
    bgLayer.style.opacity = 0;

    setTimeout(() => {
      bgLayer.style.backgroundImage = `url('${scenes[name]}')`;
      bgLayer.style.opacity = 1;
      currentScene = name;
    }, 500); // wait for fade-out before changing image
  }
}