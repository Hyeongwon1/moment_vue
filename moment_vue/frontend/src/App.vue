<template>
    <div>
		<v-app>
        <top></top>
        <router-view></router-view>
        <bottom></bottom>
		</v-app>
    </div>
</template>

<script>
import bottom from '@/components/bar/bottom.vue'
import top from '@/components/bar/top.vue'
export default {
	created(){
		
	},   
	data() {
		return {
			datas: []
		}	
	},
	components: {
			bottom,
			top
	},
	methods: {
		
	}
}
</script>

<style>

</style>