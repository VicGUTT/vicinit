import { type ComponentCustomProperties, inject } from 'vue';

export default function useRoute(): ComponentCustomProperties['route'] {
    return inject('route') as ComponentCustomProperties['route'];
}
