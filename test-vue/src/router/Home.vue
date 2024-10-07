<template>
    <h1>Home Page</h1>
    <h2>{{ $t("message.hello") }}</h2>
    <div class="flex gap-4 mt-8 mb-4">
        <button @click="setEN">English</button>
        <button @click="setJA">Japniess</button>
    </div>
    <button @click="handleLogin">Login</button>
    <ul>
        <li v-for="doc in databaseStore.docs" :key="doc._id">
            {{ doc.title }}
        </li>
    </ul>
    <div class="flex gap-4 mt-8">
        <button @click="addNewDoc">Add New Document</button>
        <button @click="resetDatabase">Reset Database</button>
        <button @click="deleteDatabase">Delete Database</button>
    </div>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </nav>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/auth";
import { useDatabaseStore } from "../stores/database";
const authStore = useAuthStore();
const databaseStore = useDatabaseStore();
const { fetchDocs, addDoc, reset, deleteDatabase } = databaseStore;

const { locale } = useI18n({});

const handleLogin = () => {
    authStore.login();
};

const updateHtmlLang = (lang: string) => {
    document.documentElement.lang = lang;
};

const setEN = () => {
    locale.value = "en";
    updateHtmlLang("en");
};

const setJA = () => {
    locale.value = "ja";
    updateHtmlLang("ja");
};

const addNewDoc = () => {
    const newDoc = {
        _id: new Date().toISOString(),
        title: `New Document ${Math.random()}`,
    };
    addDoc(newDoc);
};

const resetDatabase = () => {
    reset(); // Call reset method to clear documents
};

onMounted(() => {
    fetchDocs(); // Fetch documents when component mounts
});
</script>
