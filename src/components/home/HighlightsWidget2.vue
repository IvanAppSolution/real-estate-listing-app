<template>
    <div id="highlights2" class="py-6 px-12 lg:px-12 mx-0 my-6 lg:mx-6">
        <div class="grid grid-cols-12 gap-4 mt-16 pb-2 md:pb-20">
            <div class="img-container flex justify-center col-span-12 lg:col-span-6 bg-purple-100 p-0 order-1 lg:order-none" style="border-radius: 8px">
                <img src="/public/images/landing/people1.jpg" class="w-11/12" alt="mockup mobile" />
            </div>

            <div class="col-span-12 lg:col-span-6 my-auto flex flex-col lg:items-end text-center lg:text-right gap-4">
                <h3 class="text-3xl font-semibold text-surface-900 dark:text-surface-0">
                    Start touring homes
                </h3>
                
                <span class="text-surface-700 dark:text-surface-100 text-xl leading-normal ml-0 md:ml-2" style="max-width: 650px"
                    >We can help you easily find a home or apartment for you and your loved ones.</span
                >
                <div class=""><Button label="Explore Homes"  /></div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 mb-10 pt-2 md:pt-10">
            <div class="col-span-12 lg:col-span-6 my-auto flex flex-col text-center lg:text-left lg:items-start gap-4">
                
                <h3 class="text-3xl font-semibold text-surface-900 dark:text-surface-0">
                    Showcase your properties
                </h3>
                <span class="text-surface-700 dark:text-surface-100 text-xl leading-normal mr-0 md:mr-2" style="max-width: 650px"
                    >start your listing today and let's get your home sold!</span
                >
                <div class=""><Button label="Create Listing"  /></div>
            </div>

            <div class="img-container flex justify-center col-span-12 lg:col-span-6 bg-purple-100 p-0 order-1 lg:order-none" style="border-radius: 8px">
                <img src="/public/images/landing/person1.jpg" class="w-11/12" alt="mockup" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.img-container{
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

</style>