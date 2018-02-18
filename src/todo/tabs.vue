<template>
	<div class="helper">
		<span class="left">{{ unFinishedTodoLength }} items left</span>
		<span class="tabs">
			<span
				v-for="state in states"
				:key="state"
				:class="[state, filter === state ? 'actived' : '']"
				@click="toggleFilter(state)"
			>
				{{ state }}
			</span>
		</span>
		<span class="clear" @click="clearAllCompleted">Clear completed</span>
	</div>
</template>

<script>
export default {
	props:{
		filter : {
			type: String,
			required: true
		},
		todos: {
			type: Array,
			required: true
		}
	},
	computed: {
		// 没完成的todos长度
		unFinishedTodoLength() {
			return this.todos.filter( todo => !todo.completed ).length;
		}
	},
	data() {
		return {
			states: ['all', 'active', 'completed']
		}
	},
	methods: {
		/*
			清除所有已完成的todo:向父组件传递clearAllCompleted事件
		 */
		clearAllCompleted() {
			this.$emit('clearAllCompleted')
		},
		/*
			过滤非当前状态的todo:向父组件传递toggle事件
		 */
		toggleFilter( state ) {
			this.$emit('toggle', state)
		}
	}
}
</script>

<style lang="stylus" scoped>
.helper{
  font-weight 100
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #fff
  font-size 14px
  font-smoothing: antialiased
}
.left, .clear, .tabs{
  padding 0 10px
  box-sizing border-box
}
.left, .clear{
  width 150px
}
.left{
  text-align left
}
.clear{
  text-align right
  cursor pointer
}
.tabs{
  width 200px
  display flex
  justify-content space-around
  * {
    display inline-block
    padding 0 10px
    cursor pointer
    border 1px solid rgba(175,47,47,0)
    &.actived{
      border-color rgba(175,47,47,0.4)
      border-radius 5px
    }
  }
}
</style>