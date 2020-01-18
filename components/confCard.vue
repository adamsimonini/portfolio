<template>
    <div class="conf-card">
        <div class="conf-title">
            <h3>{{title}}</h3>
        </div>
        <div class="conf-image">
            <!-- TODO: make image link to website as well -->
            <img :src="image" />
        </div>
        <div class="conf-dates">
            <p>Start: {{startDate}}</p>
            <p>End: {{endDate}}</p>
        </div>
        <div class="conf-details">
            <div class="details-item conf-location">
                <p>{{location.city}}, {{location.country}}</p>
            </div>
            <!-- TODO: Add disabled when no link is provided  -->
            <a :href="this.website" class="details-item conf-website">
                Website
            </a>
        </div>
        <div class="deadline">
            Deadline to express interest: {{deadline}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'confCard',
    data: () => ({
    }),
    props: {
        // TODO: can I set default value to trigger when field is left blank? At the moment it never triggers
        title: {
            type: String,
            default: "not provided"
        },
        image: {
            type: String,
            default: "/images/no-image-found.png",
        },
        startDate: {
            type: String,
            default: "not provided"
        },
        endDate: {
            type: String,
            default: "not provided"
        },
        location: {
            type: Object,
            default: {
                city: "n/a",
                countey: "n/a"
            }
        },
        website: {
            type: String,
            default: "not provided"
        },
        deadline: {
            type: String,
            default: "not provided"
        },
    },
    methods: {
    },
    components: {
    },
}
</script>

<style scoped>
.conf-card {
    max-width: 400px;
    margin: 20px 20px;
}
.conf-dates{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.conf-details {
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.details-item {
    width: 33%;
    min-height: 70px;
}
.conf-image {
    text-align: center;
}
.conf-image img {
    max-width: 400px;
    max-height: 200px;
}
</style>