<template>
	<div>
		<v-app-bar app dense>
			<v-app-bar-nav-icon
				class="hidden-md-and-up"
				@click.stop="drawer = !drawer"
			></v-app-bar-nav-icon>
			<div class="pa-1"></div>
			<router-link to="/home">
				<v-toolbar-title class="head_moment">{{ title }}</v-toolbar-title>
			</router-link>
			<div class="pa-12"></div>
			<v-tabs v-model="model" slider-color="pink">
				<v-tab
					v-for="item in items"
					:key="item.id"
					v-model="model"
					class="hidden-sm-and-down"
					@click="initt(item.id)"
					>{{ item.name }}</v-tab
				>
			</v-tabs>
			<v-btn text style="margin-left: -320px;" @click="ordnwlk">{{
				newandlike
			}}</v-btn>
			<v-text-field
				flat
				v-model="searchloc"
				placeholder="search location"
				v-on:keyup.enter="onEnter"
				hide-details
				style="max-width: 210px;"
			/>
			<v-btn text @click="onEnter" style="margin-right: -15px;">
				<v-icon>search</v-icon>
			</v-btn>
			<v-btn class="hidden-sm-and-down" text @click="login('99')">LOGIN</v-btn>
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" fixed temporary>
			<v-list-item>
				<v-list-item-avatar>
					<!-- <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img> -->
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>John Leider</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list dense>
				<v-list-item-content>
					<v-list-item
						v-for="title in titles"
						:key="title.id"
						@click="login(title.id)"
					>
						<v-list-item-icon>
							<v-icon>{{ title.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ title.name }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-content>
			</v-list>
			<v-divider></v-divider>
			<v-list dense>
				<v-list-item-group v-model="model" active-class="border" color="pink">
					<v-list-item
						v-for="item in items"
						:key="item.id"
						@click="initt(item.id)"
					>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ item.name }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	name: 'top',
	data() {
		return {
			drawer: false,
			searchloc: '',
			ord: 'lk',
			newandlike: 'LIKE ▼',
			title: 'IN THE MOMENT',
			model: 1,
			items: [
				{ name: 'ALL', id: '0', icon: 'dashboard' },
				{ name: 'EAT', id: '1', icon: 'restaurant_menu' },
				{ name: 'BUY', id: '2', icon: 'money' },
				{ name: 'ENJOY', id: '3', icon: 'map' },
			],
			titles: [
				{ name: 'LOGIN', id: '99', icon: 'dashboard' },
				{ name: 'PUPP', id: '88', icon: 'dashboard' },
			],
		};
	},
	props: {},
	watch: {},
	components: {},
	methods: {
		login: function(id) {
			if (id === '99') {
				this.$router.push({ path: 'login' });
			} else {
				this.$router.push({ path: 'pupp1' });
			}
		},
		initt: function(id) {
			this.$emit('aaarr', id);
		},
		onEnter: function() {
			this.$emit('searchloc', this.searchloc);
		},
		ordnwlk: function() {
			this.$emit('ord', this.ord);
			if (this.newandlike === 'NEW ▼') {
				this.newandlike = 'LIKE ▼';
				this.ord = 'nw';
			} else {
				this.ord = 'lk';
				this.newandlike = 'NEW ▼';
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.head_moment {
	color: black;
	font-family: 'Am';
	font-size: 19pt;
}
</style>
