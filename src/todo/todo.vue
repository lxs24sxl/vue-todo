<template>
	<section class="real-app">
		<input 
			type="text"
			class="add-input"
			autofocus="autofocus"
			placeholder="接下去要做什么?"
			@keyup.enter="addTodo" 
			name="add-input"
			>
		<item 
			:todo="todo"
			v-for="todo in filteredTodos"
			:key="todo.id"
			@del="deleteTodo"
		/>
		<tabs 
			:filter="filter"
			:todos="todos"
			@toggle="toggleFilter"
			@clearAllCompleted="clearAllCompleted"
		/>
	</section>

</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0;
export default {
	data() {
		return {
			todos: [],
			filter: 'all'
		}
	},
	components: {
		Item,
		Tabs,
	},
	computed: {
		/*
			过滤todos中的某些不是该状态的值
		 */
		filteredTodos() {
			// 当显示all时,返回当前todos
			if ( this.filter === 'all') {
				return this.todos
			}
			// 否则，记录是否是completed,是则记录true
			const completed = this.filter === 'completed';
			// 过滤非该状态的值
			return this.todos.filter( todo => completed === todo.completed)
		}
	},
	methods: {
		// 添加todo列表值
		addTodo( e ) {
			var inputVal = e.target.value;
			if ( inputVal ) {
				// 数组首个插入值
				this.todos.unshift({
					id: id++,
					content: inputVal.trim(),
					completed: false
				});
				
			} else {
				window.confirm('请输入值')
			}
			e.target.value = '';
		},
		/*
			删除当前todo
		 */
		deleteTodo( id ) {
			this.todos.splice(this.todos.findIndex( todo => todo.id === id ), 1 );
		},
		/*
			显示状态
		 */
		toggleFilter( state ) {
			this.filter = state
		},
		/*
			清除所有已完成的todo
		 */
		clearAllCompleted() {
			this.todos = this.todos.filter( todo => !todo.completed )
		}
	}
}
</script>

<style lang="stylus" scoped>
.real-app {
	width 600px
	margin 0 auto
	box-shadow 0 0 5px #666
}
.add-input {
	position:relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	border: 0;
	outline: none;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	font-smoothing: antialiased;
	padding: 16px 16px 16px 60px;
	border: none;
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>