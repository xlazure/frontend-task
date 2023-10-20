import { onMounted, onUnmounted } from 'vue';

export default function (elementRef: any, callback: () => void) {
  const handleClick = (e:MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(e.target)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClick);
  });
}