<script lang="ts">
  import { themeStore } from '../core/theme-store'

  export let date
  export let startTime: string = ''
  export let handleOnClickCell: ({ appointmentDate: Date, appointmentTime: number }) => void

  const handleTimeCellClick = () => {
    handleOnClickCell && handleOnClickCell({ appointmentDate: date, appointmentTime: startTime })
  }
</script>

<style>
  .time-cell-container {
    padding: 1em;
    margin-bottom: 2px;
    cursor: pointer;
    min-height: 50px;
  }

  .time-cell-container-visible {
    visibility: visible;
  }

  .time-cell-container-not-visible {
    visibility: hidden;
    pointer-events: none;
  }
</style>

<div
  on:click={handleTimeCellClick}
  class="time-cell-container {startTime ? 'time-cell-container-visible' : 'time-cell-container-not-visible'}
  {$themeStore.timeCell}">
  <div>{startTime || ''}</div>
</div>
