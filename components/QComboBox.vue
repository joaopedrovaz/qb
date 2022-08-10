<template>
  <div class="q-combo-box">
    <QTypography
      class="q-combo-box__label"
      variant="body2"
      bold
    >
      {{ label }}
    </QTypography>

    <select
      id="test"
      name="test"
      class="q-combo-box__select"
      @change="handleOnChange"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  options: {
    type: Array<{ label: string; value: string | number }>,
    default: () => [],
    validator: (value: Array<{ label: string; value: string | number }>) =>
      !value.length || value.every(({ value, label }) => value && label),
  },
  label: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['change']);

const handleOnChange = (event: Event) => {
  const { target } = event;
  const { value } = target as HTMLInputElement;
  emit('change', value);
};
</script>

<style lang="scss" scoped>
.q-combo-box {
  position: relative;

  .q-combo-box__label {
    margin-bottom: var(--spacing-xxs);
    text-transform: uppercase;
  }

  select.q-combo-box__select {
    background-color: var(--color-common-white);
    border: 2px solid #cfd1d2;
    border-radius: 6px;
    width: 100%;
    padding: var(--spacing-sm);
    font-size: var(--font-size-body1);

    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-image:
      linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%);
    background-position:
      calc(100% - 20px) calc(1.4em + 2px),
      calc(100% - 15px) calc(1.4em + 2px),
      calc(100% - 2.5em) 0.5em;
    background-size:
      5px 5px,
      5px 5px;
    background-repeat: no-repeat;
  }
}
</style>