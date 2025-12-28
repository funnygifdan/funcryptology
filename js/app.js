(function(){
  var bg = document.getElementById("bg");
  var door = document.getElementById("door");
  var doorPanel = document.getElementById("doorPanel");
  var room = document.getElementById("room");
  var hint = document.getElementById("hint");
  var openEmbedBtn = document.getElementById("open-book-embed");
  var wrap = document.getElementById("book-frame-wrap");
  var frame = document.getElementById("book-frame");
  var closeBtn = document.getElementById("close-frame");

  var state = 0; // 0..2 path, 3=door closed, 4=door open, 5=room

  function setPathStep(i){
    state = i;
    bg.className = "bg step-" + (i+1);
    bg.classList.add("fade");
    setTimeout(function(){ bg.classList.remove("fade"); }, 450);
    hint.textContent = (i < 2) ? "Tap to move forward" : "Tap the door";
    if (i === 2) { door.hidden = false; }
  }

  function openDoor(){
    doorPanel.style.background = "linear-gradient(180deg,#532,#310)";
    door.classList.add("shake");
    setTimeout(function(){ door.classList.remove("shake"); }, 420);
    state = 4;
    hint.textContent = "Enter the house";
  }

  function enterRoom(){
    door.hidden = true;
    room.hidden = false;
    room.classList.add("fade");
    state = 5;
    hint.textContent = "Explore the room";
    if (openEmbedBtn) openEmbedBtn.hidden = false;
  }

  document.addEventListener("click", function(e){
    if (state >= 5) return;
    if (!door.hidden && door.contains(e.target)) {
      if (state === 3) { openDoor(); return; }
      if (state === 4) { enterRoom(); return; }
    }
    if (state <= 1) { setPathStep(state + 1); return; }
    if (state === 2) { state = 3; hint.textContent = "Tap the door"; return; }
  });

  if (openEmbedBtn){
    openEmbedBtn.addEventListener("click", function(e){
      e.stopPropagation();
      frame.src = "kids-book/";
      wrap.hidden = false;
    });
  }
  if (closeBtn){
    closeBtn.addEventListener("click", function(){
      wrap.hidden = true;
      frame.src = "";
    });
  }

  setPathStep(0);
})();