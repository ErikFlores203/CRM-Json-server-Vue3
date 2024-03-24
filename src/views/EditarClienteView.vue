<script setup>
    
    import { useRouter, useRoute } from 'vue-router';
    import { FormKit } from '@formkit/vue'
    import { onMounted, reactive } from 'vue';
    import ClienteService from '../services/ClienteService';
    import RouterLink from '../components/UI/RouterLink.vue'
    import Heading from '../components/UI/Heading.vue'

    const router = useRouter() // para redireccionar a una ruta
    const route = useRoute() //Para sacar informacion de una ruta

    const{ _id } = route.params
    const formData = reactive ({})

    onMounted(() => {
        ClienteService.obtenerCliente(_id)
        .then(({data}) => {
            Object.assign(formData, data)
        })
        .catch(error => console.log(error))
    })

    defineProps({
        titulo: {
            type:String
        }
    })

    const handleSubmit = (data) =>{
       ClienteService.actualizarCliente(_id,data)
       .then(()=>router.push({name:'inicio'}))
       .catch(error=> console.log(error))
    }

</script>

<template>
    
    <div>
        <div class="flex justify-end">
            <RouterLink to="inicio"> Volver </RouterLink>
        </div>
        <Heading> {{ titulo }} </Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                    type="form"
                    submit-label="Editar Cliente"
                    incomplete-message="No se pudo enviar la informacion, revisa los datos"
                    @submit="handleSubmit"
                    :value="formData"
                >
                    <FormKit
                        type="text"
                        label="Nombre"
                        name="nombre"
                        v-model="formData.nombre"
                        placeholder="Nombre del cliente"
                        validation="required"
                        :validation-messages="{required:'El Nombre del Cliente es Obligatorio!'}"
                        validation-visibility="live"
                    />
                    <FormKit
                        type="text"
                        label="Apellido"
                        name="apellido"
                        v-model="formData.apellido"
                        placeholder="Apellido del cliente"
                        validation="required"
                        :validation-messages="{required:'El Apellido del Cliente es Obligatorio!'}"
                        validation-visibility="live"
                    />
                    <FormKit
                        type="email"
                        label="Email"
                        name="email"
                        v-model="formData.email"
                        placeholder="Email del cliente"
                        validation="required|email"
                        :validation-messages="{required:'El Email del Cliente es Obligatorio!', email:'Coloca un email valido'}"
                        validation-visibility="live"
                    />
                    <FormKit
                        type="text"
                        label="Telefono"
                        name="telefono"
                        v-model="formData.telefono"
                        placeholder="Telefono: XXX-XXX-XXXX"
                        validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{matches:'El Formato no es válido'}"
                        validation-visibility="live"
                    />
                    <FormKit
                        type="text"
                        label="Empresa"
                        name="empresa"
                        v-model="formData.empresa"
                        placeholder="Empresa del cliente"
                    />
                    <FormKit
                        type="text"
                        label="Puesto"
                        name="puesto"
                        v-model="formData.puesto"
                        placeholder="Puesto del cliente"
                    />
                </FormKit>
            </div>
        </div>

    </div>
</template>

<style>
    .formkit-wrapper{
        max-width: 100%;
    }
</style>