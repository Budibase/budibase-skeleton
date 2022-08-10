<script>
  import { onMount, getContext } from "svelte"

  const { API } = getContext("sdk")
  let self

  onMount(async () => {
    self = await API.fetchSelf()
  })
</script>

<div>
  <b>This is a custom component.</b>
</div>
<div>
  Your email address is {self?.email}.
</div>