<template>
  <div id="highlights" class="py-6 px-6 lg:px-6 mx-0 my-6 lg:mx-6">
    <div class="image-grid-container">
      <div class="column">
        <div class="box-wrapper">
          <div class="box" style="height: 330px">
            <h2 class="">Rent or list your home faster</h2>
            <p class="houzez_section_subtitle">
              Whether you are the homeowner or the listing agent, you can take advantage.
            </p>
            <p>Whether you’re searching for apartments, condos, or rental homes, we make it easy to find a place you’ll love.</p>
          </div>
          <div class="box" style="height: 430px; background-image: url('/images/highlights/1.jpg')">
            <a href="#" class="hover-effect-flat"></a>
              <div  class="box-desc">
                <h3>Studio</h3>
                <p>More details</p>
              </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box-wrapper">
        
          <div class="box" style="height: 250px; background-image: url('/images/highlights/2.jpg')">
            <a href="/find=studio" class="hover-effect-flat"></a>            
             <div class="box-desc">
                <h3>Apartment</h3>
                <p>More details</p>
              </div>
          </div>
          <div class="box" style="height: 250px; background-image: url('/images/highlights/3.jpg')">
            <a href="#" class="hover-effect-flat"></a>
              <div class="box-desc">
                <h3>Single Family Home</h3>
                <p>More details</p>
              </div>
          </div>
          <div class="box" style="height: 250px; background-image: url('/images/highlights/4.jpg')">
            <a href="#" class="hover-effect-flat"></a>
              <div class="box-desc">
                <h3>Shop</h3>
                <p>More details</p>
              </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box-wrapper">
          <div class="box" style="height: 400px; background-image: url('/images/highlights/5.jpg')">
            <a href="#" class="hover-effect-flat"></a>
              <div class="box-desc">
                <h3>Office</h3>
                <p>More details</p>
              </div>
          </div>
          <div class="box" style="height: 360px; background-image: url('/images/highlights/6.jpg')">
            <a href="#" class="hover-effect-flat"></a>
              <div class="box-desc">
                <h3>Villa</h3>
                <p>More details</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-grid-container {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.column {
  width: 33.33%;
}

.box-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  padding: 15px;
  gap: 1rem;
}

/* .box {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 5px;
} */

.box {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
}

.box div {
  display: flex;
  flex-direction: column;
  color: #fff;
  height: 100%;
  padding: 1rem;
  justify-content: space-between;
}

.box-desc h3{
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px #4b4b4b;
  z-index: 30;
    pointer-events: none; 
}

.box-desc p {
  color: white;
  font-size: 1rem;
  z-index: 30;
  pointer-events: none; 
}

.hover-effect-flat {
  position: absolute;
  inset: 0;
  display: block;
  border-radius: 3px;
  cursor: pointer;
  overflow: hidden;
  opacity: 0.2;
  background-color: #000;
}

.hover-effect-flat:hover {
  opacity: 0.05;
  transition: 0.2s;
}

@media (max-width: 768px) {
  .column {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .photo {
    width: 100%;
  }
}
</style>
