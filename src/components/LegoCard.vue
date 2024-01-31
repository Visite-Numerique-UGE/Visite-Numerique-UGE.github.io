<template>
    <img pictureUrl="" v-bind:src="set_img_url"/>
    <h2>{{ set_num }}</h2>
    <h3>{{ name }}</h3>
    <p> {{ num_parts }}</p>
    <p> {{ year }}</p>
</template>

<script>

export default {
    name : 'LegoCard',
    props:{
        set_num : String,
        name : String,
        num_parts : String,
        year : String,
        set_img_url : String,
    },
}
</script>

<style>
img {
    width : 150px;
}
</style>