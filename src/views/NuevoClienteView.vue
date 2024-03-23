<script setup>
    
    import ClienteService from '../services/ClienteService';
    import { useRouter } from 'vue-router';
    import { FormKit } from '@formkit/vue'
    import RouterLink from '../components/UI/RouterLink.vue'
    import Heading from '../components/UI/Heading.vue'

    const router = useRouter()

    defineProps({
        titulo: {
            type:String
        }
    })

    const formData = {
        nombre:''
    }

    const handleSubmit = (data) =>{
        data.estado = 1
        ClienteService.agregarCliente(data)
            .then(respuesta => {
                // Redireccion
                console.log(respuesta);
                router.push({name: 'inicio'})
                
            })
            .catch(error => console.log(error))
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
                    submit-label="Agregar Cliente"
                    incomplete-message="No se pudo enviar la informacion, revisa los datos"
                    @submit="handleSubmit"
                    :value="formData"
                >
                    <FormKit
                        type="text"
                        label="Nombre"
                        name="nombre"

                        placeholder="Nombre del cliente"
                        validation="required"
                        :validation-messages="{required:'El Nombre del Cliente es Obligatorio!'}"
                        validation-visibility="live"
                    />
                    <FormKit
                        type="text"
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido del cliente"
                        validation="required"
                        :validation-messages="{required:'El Apellido del Cliente es Obligatorio!'}"
                        validation-visibility="live"
                    />
                    <FormKit
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Email del cliente"
                        validation="required|email"
                        :validation-messages="{required:'El Email del Cliente es Obligatorio!', email:'Coloca un email valido'}"
                        validation-visibility="live"
                    />
                    <FormKit
                        type="text"
                        label="Telefono"
                        name="telefono"
                        placeholder="Telefono: XXX-XXX-XXXX"
                        validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{matches:'El Formato no es válido'}"
                        validation-visibility="live"
                    />
                    <FormKit
                        type="text"
                        label="Empresa"
                        name="empresa"
                        placeholder="Empresa del cliente"
                    />
                    <FormKit
                        type="text"
                        label="Puesto"
                        name="puesto"
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