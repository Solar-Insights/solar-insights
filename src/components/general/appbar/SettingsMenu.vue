<template>
    <MenuContainer>
        <v-card-title> {{ $t(`general.quick-settings.title`) }} </v-card-title>

        <MenuCard
            :text="$t(`general.quick-settings.theme`)"
            :theme="theme"
            :icon="`mdi-lightbulb-on-outline`"
            :detail="themeDetail"
            @sendAction="userSessionStore.changeTheme()"
        />
        
        <MenuCard
            :text="$t(`general.quick-settings.language`)"
            :theme="theme"
            :icon="`mdi-earth`"
            :detail="localeDetail"
                @sendAction="userSessionStore.changeLocale();
                updateVuetifyLocale();
                locale === 'fr' ? ($i18n.locale = 'fr') : ($i18n.locale = 'en');
            "
        />
    </MenuContainer>
</template>

<script setup lang="ts">
import MenuContainer from "@/components/general/appbar/MenuContainer.vue";
import MenuCard from "@/components/general/appbar/MenuCard.vue";
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "@/stores/userSessionStore";
import { useLocale } from "vuetify";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const userSessionStore = useUserSessionStore();
const t = useI18n().t;
const { theme, locale } = storeToRefs(userSessionStore);
const { current } = useLocale();

function updateVuetifyLocale() {
    current.value = locale.value;
}

const themeDetail = computed(() =>
    theme.value === "dark" ? t(`general.quick-settings.dark`) : t(`general.quick-settings.light`)
)

const localeDetail = computed(() =>
    `${locale.value === "fr" ? "Français" : "English"} -> ${locale.value === "fr" ? "English" : "Français"}`
)
</script>
