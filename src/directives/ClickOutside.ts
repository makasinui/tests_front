export default {
    mounted: function (el: any, binding: any) {
        el.clickOutsideEvent = function (event: any) {
            const selfTarget = el === event.target || el.contains(event.target);

            if (Array.isArray(binding.value)) {
                const valid = binding.value[0]().some((node: HTMLElement) => {
                    // node - элемент из массива исключений, на котором не должен срабатывать clickOutside
                    // event.target - элемент на котором произошел клик

                    return (
                        node === event.target ||
                        node?.contains(event.target) ||
                        event.target.className === 'dialog' ||
                        event.target.closest('.dialog')
                    );
                });

                if (!(selfTarget || valid)) {
                    binding.value[1]();
                }
            } else if (!selfTarget) {
                binding.value ? binding.value() : null;
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: function (el: any) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};
