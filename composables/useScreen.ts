export const MIN_SCREEN_WIDTH_DESKTOP = 992;

export const useScreen = () => {
  const screen = ref({
    width: 0,
    height: 0,
  });
  const isMobile = ref(false);
  const isDesktop = ref(false);

  const setDisplay = () => {
    if (window.innerWidth >= MIN_SCREEN_WIDTH_DESKTOP) {
      isDesktop.value = true;
      isMobile.value = false;
    } else {
      isDesktop.value = false;
      isMobile.value = true;
    }
  };

  const handleResize = () => {
    screen.value = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setDisplay();
  };

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return {
    screen,
    isMobile,
    isDesktop,
  };
};
