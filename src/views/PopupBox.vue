<template>
    <div class="roadPopUpBox">
        <h3 class="title">{{info.szLocationName}}</h3>
        <div class="contentBox" v-if="cultural">
            <div class="itemsBox">
                <p>联系人</p>
                <p class="valueBox">{{info.name}}</p>
            </div>
            <div class="itemsBox">
                <p>电话</p>
                <p class="valueBox">{{info.tel}}</p>
            </div>
            <div class="itemsBox">
                <p>星级</p>
                <p class="valueBox">{{info.star}}</p>
            </div>
            <div class="itemsBox">
                <p>特色</p>
                <p class="valueBox">{{info.particular}}</p>
            </div>
            <div class="itemsBox">
                <p>面积</p>
                <p class="valueBox">{{info.area}}</p>
            </div>
            <div class="itemsBox">
                <p>地址</p>
                <p class="valueBox">{{info.address}}</p>
            </div>
        </div>
        <div class="contentBox" v-if="hotel">
            <div class="itemsBox">
                <p>房间数</p>
                <p class="valueBox">{{info.rooms}} 间</p>
            </div>
            <div class="itemsBox">
                <p>价钱</p>
                <p class="valueBox">{{info.price}}</p>
            </div>
            <div class="itemsBox">
                <p>地址</p>
                <p class="valueBox">{{info.address}}</p>
            </div>
        </div>
        <div class="contentBox" v-if="nursing">
            <div class="itemsBox">
                <p>性质</p>
                <p class="valueBox">{{info.ecokind}}</p>
            </div>
            <div class="itemsBox">
                <p>电话</p>
                <p class="valueBox">{{info.tel}}</p>
            </div>
            <div class="itemsBox">
                <p>价钱</p>
                <p class="valueBox">{{info.price}}</p>
            </div>
            <div class="itemsBox">
                <p>床位数</p>
                <p class="valueBox">{{info.beds}}</p>
            </div>
            <div class="itemsBox">
                <p>特色</p>
                <p class="valueBox">{{info.particular}}</p>
            </div>
            <div class="itemsBox">
                <p>地址</p>
                <p class="valueBox">{{info.address}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return{
            title: '学府路',
            info:{},
            cultural:false,
            hotel: false,
            nursing: false
        }
    },
    props:['roadData'],
    mounted(){
        console.log(this.$props.roadData)
        this.info = JSON.parse(this.$props.roadData)
        if (this.info.star) {
            this.cultural = true
            this.info.szLocationName = '文化旅游'
        } else if (this.info.hotelId) {
            this.hotel = true
            this.info.szLocationName = this.info.name
        } else if (this.info.nursingHomeId) {
            this.nursing = true
            this.info.szLocationName = this.info.name
        }

    }
}
</script>
<style  scoped>
    .roadPopUpBox{
        width: 100%;
        display: flex;
        flex-direction: column;
        /* justify-content: flex-start; */
        align-items: center;
    }
    .title{
        text-align: center;
        color: aliceblue;
    }
    .contentBox{
        width: 100%;
    }
    .itemsBox p {
        margin: 5px 0;
    }
    .itemsBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
    }
    .itemsBox .valueBox {
        width: 200px;
        text-align: right;
    }
</style>

