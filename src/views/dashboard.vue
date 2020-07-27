<template>
    <div id="map">
        <div class="headerBox">
            <img src="../../src/assets/images/logo.png" alt="" />
            <p class="title">句容市文旅大盘展示</p>
        </div>
        <div class="switchBox">
            <span class="switchTitle">卫星影像</span
            ><el-switch
                v-model="switchMap"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="setMapTheme"
            ></el-switch>
        </div>
        <div class="bottomBox">
            <div
                v-for="item in navBarList"
                :key="item.id"
                :class="[isClick === item.id ? 'activeitemsNav' : 'itemsNav']"
                @click="getPrivinceData(item.id)"
            >
                <i :class="item.icon"></i>
                <p class="name">{{ item.name }}</p>
            </div>
            <!-- <div class="bottomNmaeBox">
                <el-button
                    size="small"
                    @click="goLogin"
                    v-if="!comName"
                    type="primary"
                    round
                    >登录</el-button
                >
                <span class="bottomNmae" v-if="comName">{{ comName }}</span>
                <el-button v-if="comName" type="text" @click="logOut"
                    >退出</el-button
                >
            </div> -->
        </div>
        <!-- <div class="leftBox">
            <div class="leftItemsBox">
                <div class="leftheaderBox">
                    <p class="headerTitle">企业数量</p>
                </div>
                <div class="etitle">总数:{{ amount }}家</div>
                <div id="outputValue"></div>
            </div>
            <div class="leftItemsBox">
                <div class="leftheaderBox">
                    <p class="headerTitle">产业规模</p>
                </div>
                <div class="etitle">总产值：{{ totalValue }}亿元</div>
                <div id="modelll"></div>
            </div>
        </div>
        <div class="rightBox">
            <el-input v-model="search" placeholder="请输入企业名称">
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getScenList"
                ></el-button>
            </el-input>
            <div style="height:20px"></div>
            <div class="leftheaderBox">
                <p class="headerTitle">产业链分布</p>
            </div>
            <div class="content">
                <div class="btnGroups">
                    <el-radio-group
                        v-model="activeName"
                        @change="changeActiveName"
                    >
                        <el-radio-button label="产品"></el-radio-button>
                        <el-radio-button label="项目"></el-radio-button>
                        <el-radio-button label="需求"></el-radio-button>
                    </el-radio-group>
                    <div v-if="activeName === '产品'" class="listBox">
                        <div
                            class="cardBox"
                            v-for="(item, index) in productList"
                            :key="index"
                        >
                            <div class="cardContent">
                                <p class="cardTitle">{{ item.productName }}</p>
                                <p class="cardDetail">
                                    {{ item.productIntroduce }}
                                </p>
                                <el-button
                                    type="text"
                                    style="color:'#ffffff';text-align: right;"
                                    @click="showProductDetail(item)"
                                    >查看更多>></el-button
                                >
                            </div>
                        </div>
                    </div>
                    <div v-if="activeName === '项目'" class="listBox">
                        <div
                            class="cardBox"
                            v-for="(item, index) in projectList"
                            :key="index"
                        >
                            <div v-if="!adminFlag">
                                <div
                                    class="cardContent"
                                    v-if="item.isEncryption === 0"
                                >
                                    <p class="cardTitle">
                                        {{ item.projectName }}
                                    </p>
                                    <p class="cardDetail">
                                        {{ item.projectIntroduce }}
                                    </p>
                                    <el-button
                                        type="text"
                                        style="color:'#ffffff';text-align: right;"
                                        @click="showProjectDetail(item)"
                                        >查看更多>></el-button
                                    >
                                </div>
                                <div
                                    class="cardContent"
                                    v-if="item.isEncryption === 1"
                                >
                                    <p class="cardTitle">
                                        {{ item.projectName }}
                                    </p>
                                    <p class="cardDetail">
                                        加密：{{ item.encryptionCode }}
                                    </p>
                                </div>
                            </div>
                            <div v-if="adminFlag">
                                <div class="cardContent">
                                    <p class="cardTitle">
                                        {{ item.projectName }}
                                    </p>
                                    <p class="cardDetail">
                                        {{ item.projectIntroduce }}
                                    </p>
                                    <el-button
                                        type="text"
                                        style="color:'#ffffff';text-align: right;"
                                        @click="showProjectDetail(item)"
                                        >查看更多>></el-button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="activeName === '需求'" class="listBox">
                        <div
                            class="cardBox"
                            v-for="(item, index) in needList"
                            :key="index"
                        >
                            <div v-if="!adminFlag">
                                <div
                                    class="cardContent"
                                    v-if="item.isEncryption === 0"
                                >
                                    <p class="cardTitle">
                                        {{ item.demandName }}
                                    </p>
                                    <span v-if="item.type === 1"
                                        >主营产品需求</span
                                    >
                                    <span v-if="item.type === 2"
                                        >在研项目需求</span
                                    >
                                    <span v-if="item.type === 3"
                                        >其他合作需求</span
                                    >
                                    <div class="needTagBox">
                                        <span
                                            v-for="(el,
                                            index) in item.demandClass"
                                            :key="index"
                                        >
                                            <span v-if="el === 1"
                                                >资金支持</span
                                            >
                                            <span v-if="el === 2"
                                                >技术支撑</span
                                            >
                                            <span v-if="el === 3"
                                                >市场推广</span
                                            >
                                        </span>
                                    </div>
                                    <el-button
                                        type="text"
                                        style="color:'#ffffff';text-align: right;"
                                        @click="showNeedDetail(item)"
                                        >查看更多>></el-button
                                    >
                                </div>
                                <div
                                    class="cardContent"
                                    v-if="item.isEncryption === 1"
                                >
                                    <p class="cardTitle">
                                        {{ item.demandName }}
                                    </p>
                                    <span v-if="item.type === 1"
                                        >主营产品需求</span
                                    >
                                    <span v-if="item.type === 2"
                                        >在研项目需求</span
                                    >
                                    <span v-if="item.type === 3"
                                        >其他合作需求</span
                                    >
                                    <div class="needTagBox">
                                        <span
                                            v-for="(el,
                                            index) in item.demandClass"
                                            :key="index"
                                        >
                                            <span v-if="el === 1"
                                                >资金支持</span
                                            >
                                            <span v-if="el === 2"
                                                >技术支撑</span
                                            >
                                            <span v-if="el === 3"
                                                >市场推广</span
                                            >
                                        </span>
                                    </div>
                                    <p class="cardDetail">
                                        加密：{{ item.encryptionCode }}
                                    </p>
                                </div>
                            </div>
                            <div v-if="adminFlag">
                                <div class="cardContent">
                                    <p class="cardTitle">
                                        {{ item.demandName }}
                                    </p>
                                    <p class="cardDetail">
                                        {{ item.demandInfo }}
                                    </p>
                                    <span v-if="item.type === 1"
                                        >主营产品需求</span
                                    >
                                    <span v-if="item.type === 2"
                                        >在研项目需求</span
                                    >
                                    <span v-if="item.type === 3"
                                        >其他合作需求</span
                                    >
                                    <div class="needTagBox">
                                        <span
                                            v-for="(el,
                                            index) in item.demandClass"
                                            :key="index"
                                        >
                                            <span v-if="el === 1"
                                                >资金支持</span
                                            >
                                            <span v-if="el === 2"
                                                >技术支撑</span
                                            >
                                            <span v-if="el === 3"
                                                >市场推广</span
                                            >
                                        </span>
                                    </div>
                                    <el-button
                                        type="text"
                                        style="color:'#ffffff';text-align: right;"
                                        @click="showNeedDetail(item)"
                                        >查看更多>></el-button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="sceanDetailDialog" v-if="sceanFlag">
            <div class="sceanDialogHeader">
                <p class="dialogTitle">{{ sceanData.title }}</p>
                <i class="el-icon-close" @click="closeDialog"></i>
            </div>
            <div class="divider"></div>
            <div class="sceanBox">
                <p class="stepsTitle">① 描述:</p>
                <div class="stepsContent">
                    <p class="stepsDetail">{{ sceanData.info }}</p>
                </div>
                <div v-if="proFlag">
                    <p class="stepsTitle">② 图片介绍:</p>
                    <div class="stepsContent">
                        <el-image
                            style="width: 200px; height: 120px"
                            :src="url"
                            :preview-src-list="srcList"
                        >
                        </el-image>
                    </div>
                    <p class="stepsTitle">③ 视频介绍:</p>
                    <div class="stepsContent">
                        <video class="myVideo" :src="videoUrl" controls></video>
                    </div>
                </div>
            </div>
        </div>
        <div class="sceanDetailDialog" v-if="enterpriseFlag">
            <div class="sceanDialogHeader">
                <p class="dialogTitle">{{ parkName }}</p>
                <i class="el-icon-close" @click="closeEnterpriseDialog"></i>
            </div>
            <div class="divider"></div>
            <div class="enterpriseBox">
                <el-tabs
                    v-model="activeIndex"
                    :tab-position="tabPosition"
                    style="height: 200px;"
                    :stretch="false"
                    @tab-click="handleTabClick"
                >
                    <el-tab-pane
                        v-for="(item, index) in enterpriseList"
                        :key="index"
                        :label="item.comName"
                    >
                        <div class="enterpriseDetail">
                            <div class="detailBox">
                                <p>法人：{{ item.opername }}</p>
                                <p>注册资金：{{ item.registcapi }}</p>
                                <p>地址：{{ item.product }}</p>
                                <p>成立日期：{{ item.startdate }}</p>
                                <p>简介：{{ item.info }}</p>
                                <p>
                                    官方网站：<a
                                        target="_blank"
                                        style="color:#fff"
                                        :href="item.websiteAddress"
                                        >{{ item.websiteAddress }}</a
                                    >
                                </p>
                                <p>员工数：{{ item.staffnum }}</p>
                                <p>2019营收：{{ item.lastincome }}万元</p>
                                <p>5G相关营收：{{ item.oldincome }}万元</p>
                                <p>股票代码：{{ item.stockCode }}</p>
                                <p>员工数：{{ item.staffnum }}</p>
                                <p>联系人：{{ item.concatperson }}</p>
                                <p>电话：{{ item.phone }}</p>
                                <p>邮箱：{{ item.email }}</p>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="sceanDetailDialog" v-if="searchFlag">
            <div class="sceanDialogHeader">
                <p class="dialogTitle">{{ searchEnterprise }}</p>
                <i class="el-icon-close" @click="closeEnterpriseDialog"></i>
            </div>
            <div class="divider"></div>
            <div class="enterpriseBox">
                <el-tabs :tab-position="tabPosition" :stretch="false">
                    <el-tab-pane :label="enterpriseName">
                        <div class="enterpriseDetail">
                            <div class="detailBox">
                                <!-- <p>法人：{{enterprise.legalPerson}}</p> -->
                                <p>法人：{{ enterprise.opername }}</p>
                                <p>注册资金：{{ enterprise.registcapi }}</p>
                                <p>地址：{{ enterprise.product }}</p>
                                <p>简介：{{ enterprise.info }}</p>
                                <p>
                                    官方网站：<a
                                        :href="enterprise.websiteAddress"
                                        >{{ enterprise.websiteAddress }}</a
                                    >
                                </p>
                                <p>员工数：{{ enterprise.staffnum }}</p>
                                <p>2019营收：{{ enterprise.lastincome }}</p>
                                <p>2018营收：{{ enterprise.oldincome }}</p>
                                <p>股票代码：{{ enterprise.stockCode }}</p>
                                <p>员工数：{{ enterprise.staffnum }}</p>
                            </div>
                        </div>
                        <div class="tagBox">
                            <el-tag
                                effect="dark"
                                type="warning"
                                closable
                                v-for="(item, index) in elementsList"
                                :key="index"
                                >{{ item }}</el-tag
                            >
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
        >
            <div>
                为优化体验效果，请点击下载<a
                    target="_blank"
                    href="https://www.google.cn/chrome/"
                    >chrome浏览器</a
                >
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="centerDialogVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="查看图片"
            :visible.sync="imgDialogVisible"
            width="50%"
            center
        >
            <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
            >
            </el-image>
            <el-carousel :interval="4000">
                <el-carousel-item
                    v-for="(item, index) in companySceneImgDTOList"
                    :key="index"
                >
                    <img class="realImg" :src="item.scenarioImg" alt="" />
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>

<script>
// 万里
import Vue from 'vue'
import mapboxgl from "mapbox-gl"
import echarts from "echarts"
import axios from "axios"
import jurong from '../fiveData/jurong.json'
import fourData from '../roadJson/four.json'
import PopupBox from './PopupBox'
import {
    listBaseInfo
} from "@/api/home"

export default {
    data() {
        return {
            centerDialogVisible: false,
            map: "", //地图实例
            switchMap: false,
            navBarList: [
                {
                    id: 1,
                    name: "文化旅游",
                    icon: "iconfont icon-wangluo",
                },
                {
                    id: 2,
                    name: "农业示范",
                    icon: "iconfont icon-xinpian",
                },
                {
                    id: 3,
                    name: "康养中心",
                    icon: "iconfont icon-modular",
                },
                {
                    id: 4,
                    name: "全部",
                    icon: "iconfont icon-quanbu",
                },
            ], // 底部导航栏菜单
            isClick: 4, // 默认选择全部
            search: "", //搜索框输入内容
            sceanFlag: false,
            sceanData: {},
            enterpriseFlag: false,
            tabPosition: "left",
            colors: ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c"],
            enterpriseList: [],
            parkName: "",
            activeIndex: 0,
            radar: "",
            radarFlag: false,
            elementsList: ["算法", "芯片", "终端", "系统", "平台"],
            culturalSearchReault: {
                type: "FeatureCollection",
                crs: {
                    type: "name",
                    properties: {
                        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
                    },
                },
                features: []
            },
            hotelSearchReault: {
                type: "FeatureCollection",
                crs: {
                    type: "name",
                    properties: {
                        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
                    },
                },
                features: []
            },
            nursingSearchReault: {
                type: "FeatureCollection",
                crs: {
                    type: "name",
                    properties: {
                        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
                    },
                },
                features: []
            },
            cityList: [
                {
                    id: 1,
                    city: "南京市",
                    coordinates: [118.796539, 32.058441],
                },
                {
                    id: 2,
                    city: "无锡市",
                    coordinates: [120.312332, 31.491756],
                },
                {
                    id: 3,
                    city: "徐州市",
                    coordinates: [117.284042, 34.206741],
                },
                {
                    id: 4,
                    city: "常州市",
                    coordinates: [119.59794, 31.72322],
                },
                {
                    id: 5,
                    city: "苏州市",
                    coordinates: [120.585297, 31.29904],
                },
                {
                    id: 6,
                    city: "南通市",
                    coordinates: [120.894287, 31.98078],
                },
                {
                    id: 7,
                    city: "连云港市",
                    coordinates: [119.1773, 34.84065],
                },
                {
                    id: 8,
                    city: "淮安市",
                    coordinates: [119.021263, 33.597507],
                },
                {
                    id: 9,
                    city: "盐城市",
                    coordinates: [120.50102, 33.20107],
                },
                {
                    id: 10,
                    city: "扬州市",
                    coordinates: [119.43157, 32.39463],
                },
                {
                    id: 11,
                    city: "镇江市",
                    coordinates: [119.43396, 32.13188],
                },
                {
                    id: 12,
                    city: "泰州市",
                    coordinates: [119.922981, 32.45615],
                },
                {
                    id: 13,
                    city: "宿迁市",
                    coordinates: [118.241703, 33.964418],
                },
            ],
            searchFlag: false,
            searchEnterprise: "",
            enterprise: {},
            officeList: [],
            totalValue: 581.95,
            amount: 0,
            activeName: "产品",
            knowledge: 0,
            legalPerson: "",
            ContactInfo: {},
            companySceneImgDTOList: [],
            videoUrl: "",
            imgTitle: "",
            imgDialogVisible: false,
            url: "",
            srcList: [],
            newSceanListArr: [],
            productList: [],
            projectList: [],
            needList: [],
            dataValue: {},
            loginFlag: false,
            adminFlag: false,
            comName: "",
            popup: "",
            proFlag: false,
            socket: '',
            websocket: '',
            hoveredStateId: null,
            colorList:["#008000","#FF8C00","#D2691E","#FF4500","#800000"],
            token: undefined,
            sendFlag: false,
            trafficFlow:{},
            culturalTourismDTOList: [],
            hotelDTOList: [],
            nursingHomeDTOList: []
        }
    },
    components:{
        PopupBox
    },
    mounted() {
        // this.initWebsocket()
        // this.handleWebsocket()
        this.checkBrowserVersion()
        this.initMap()
        // this.getEchartsData()
        // this.getScenList()
    },
    methods: {
        checkBrowserVersion() {
            var browser = navigator.appName
            var b_version = navigator.appVersion
            var version = parseFloat(b_version)
            if (browser === "Netscape" && version < 5) {
                // alert("请下载最新版浏览器")
                window.location.href = "https://www.google.cn/chrome/"
                return false
            }
        },
        checkLogin() {
            console.log(this.map.getSource("xuefu")._data.features)
            let featureData = this.map.getSource("xuefu")._data
            featureData.features.forEach(el=>{
                if(el.properties.status < 2.5) {
                    el.properties.color = this.colorList[0]
                } else if (el.properties.status < 4.5) {
                    el.properties.color = this.colorList[1]
                } else if (el.properties.status < 6.5) {
                    el.properties.color = this.colorList[2]
                } else if (el.properties.status < 8.5) {
                    el.properties.color = this.colorList[3]
                } else if (el.properties.status < 10.5) {
                    el.properties.color = this.colorList[4]
                }
                this.map.getSource("xuefu").setData(featureData);
            })
        },
        initMap() {
            mapboxgl.accessToken =
                "pk.eyJ1Ijoibnl5anl5YW5mYXBlbmciLCJhIjoiY2p3ajU4eXI2MGdxcDQ4cGI4cHI2bHhjcSJ9.m4FzyOH_5Yo3YVnroLxk-w"
            this.map = new mapboxgl.Map({
                container: "map",
                // style: "http://106.15.47.224:8688/styles/newblue/style.json",
                style: "mapbox://styles/zplinze/ck2wvh2pa05ip1cr8supcaivg",
                center: [119.186707, 31.86471],// "lng":"119.186707","lat":"31.86471"
                zoom: 10.3,
                pitch: 60,
                bearing: -0.03,
            })
            this.map.on("mouseenter", "cultural_label", (e) => {
                console.log(e.features[0])
                if (this.hoveredStateId) {
                    this.map.setFeatureState(
                        { source: 'cultural', id: this.hoveredStateId },
                        { hover: false }
                        );
                    }
                    this.hoveredStateId = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'cultural', id: this.hoveredStateId },
                        { hover: true }
                    );
                let poptitle = e.features[0].properties.city
                const dom = document.createElement("div");
                this.popup = new mapboxgl.Popup({
                    closeButton: false,
                    maxWidth:'400px'
                })
                    .setLngLat(e.lngLat)
                    .setDOMContent(dom)
                    .addTo(this.map)
                    new Vue({
                        render: h =>
                        h(PopupBox, {
                            props: {
                                roadData: e.features[0].properties.comList
                            }
                        })
                    }).$mount(dom);
            })
            this.map.on("mouseleave", "cultural_label", (e) => {
                this.popup.remove()
            })
            this.map.on("mouseenter", "hotel_label", (e) => {
                console.log(e.features[0])
                if (this.hoveredStateId) {
                    this.map.setFeatureState(
                        { source: 'hotel', id: this.hoveredStateId },
                        { hover: false }
                        );
                    }
                    this.hoveredStateId = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'hotel', id: this.hoveredStateId },
                        { hover: true }
                    );
                let poptitle = e.features[0].properties.city
                const dom = document.createElement("div");
                this.popup = new mapboxgl.Popup({
                    closeButton: false,
                    maxWidth:'400px'
                })
                    .setLngLat(e.lngLat)
                    .setDOMContent(dom)
                    .addTo(this.map)
                    new Vue({
                        render: h =>
                        h(PopupBox, {
                            props: {
                                roadData: e.features[0].properties.comList
                            }
                        })
                    }).$mount(dom);
            })
            this.map.on("mouseleave", "hotel_label", (e) => {
                this.popup.remove()
            })
            this.map.on("mouseenter", "nur_label", (e) => {
                console.log(e.features[0])
                if (this.hoveredStateId) {
                    this.map.setFeatureState(
                        { source: 'nursing', id: this.hoveredStateId },
                        { hover: false }
                        );
                    }
                    this.hoveredStateId = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'nursing', id: this.hoveredStateId },
                        { hover: true }
                    );
                let poptitle = e.features[0].properties.city
                const dom = document.createElement("div");
                this.popup = new mapboxgl.Popup({
                    closeButton: false,
                    maxWidth:'400px'
                })
                    .setLngLat(e.lngLat)
                    .setDOMContent(dom)
                    .addTo(this.map)
                    new Vue({
                        render: h =>
                        h(PopupBox, {
                            props: {
                                roadData: e.features[0].properties.comList
                            }
                        })
                    }).$mount(dom);
            })
            this.map.on("mouseleave", "nur_label", (e) => {
                this.popup.remove()
            })
            this.map.on("styledata", () => {
                this.handleXuefulu()
                this.getCulturalJurongData()
                this.getHotelData()
                this.getNursingData()
                this.getPrivinceData(this.isClick)
            })
        },
        getEchartsData() {
            getScale().then((res) => {
                this.dataValue = res.data.result
                this.getEnterpriseMode()
                this.getOutputValue()
                this.totalValue =
                    (this.dataValue.downstreamValueSum +
                        this.dataValue.midstreamValueSum +
                        this.dataValue.upstreamValueSum) /
                    10000
                this.amount =
                    this.dataValue.downstreamCount +
                    this.dataValue.midstreamCount +
                    this.dataValue.upstreamCount
            })
        },
        getPrivinceData(id) {
            this.isClick = id
            console.log(this.isClick)
            if (this.isClick === 4) {
                console.log(this.map.getSource('nursing'))
                console.log(this.map.getSource('hotel'))
                console.log(this.map.getSource('cultural'))
                console.log(this.map.getLayer("nur_label"))
                console.log(this.map.getLayer("hotel_label"))
                console.log(this.map.getLayer("cultural_label"))
                // if(!this.map.getSource('nursing')){
                //     this.map.addSource("nursing", {
                //         type: "geojson",
                //         data: this.nursingSearchReault
                //     })
                // }
                // if(!this.map.getSource('hotel')){
                //     this.map.addSource("hotel", {
                //         type: "geojson",
                //         data: this.hotelSearchReault
                //     })
                // }
                // if(!this.map.getSource('cultural')){
                //     this.map.addSource("cultural", {
                //         type: "geojson",
                //         data: this.culturalSearchReault
                //     })
                // }
                
                if (!this.map.getLayer("nur_label")) {
                    this.map.addLayer({
                        id: "nur_label",
                        type: "circle",
                        source: "nursing",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#009a83',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
                if (!this.map.getLayer("hotel_label")) {
                    this.map.addLayer({
                        id: "hotel_label",
                        type: "circle",
                        source: "hotel",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#2d80de',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
                if (!this.map.getLayer("cultural_label")) {
                    this.map.addLayer({
                        id: "cultural_label",
                        type: "circle",
                        source: "cultural",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#cd8d1f',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
            } else if (this.isClick === 3){
                if(!this.map.getSource('nursing')){
                    this.map.addSource("nursing", {
                        type: "geojson",
                        data: this.nursingSearchReault
                    })
                }
                if (this.map.getLayer('hotel_label')) {
                    this.map.removeLayer('hotel_label');
                }
                if (this.map.getLayer('cultural_label')) {
                    this.map.removeLayer('cultural_label');
                }
                if (!this.map.getLayer("nur_label")) {
                    this.map.addLayer({
                        id: "nur_label",
                        type: "circle",
                        source: "nursing",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#009a83',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
            } else if (this.isClick === 2) {
                if(!this.map.getSource('hotel')){
                    this.map.addSource("hotel", {
                        type: "geojson",
                        data: this.hotelSearchReault
                    })
                }
                if (this.map.getLayer('nur_label')) {
                    this.map.removeLayer('nur_label');
                }
                if (this.map.getLayer('cultural_label')) {
                    this.map.removeLayer('cultural_label');
                }
                if (!this.map.getLayer("hotel_label")) {
                    this.map.addLayer({
                        id: "hotel_label",
                        type: "circle",
                        source: "hotel",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#2d80de',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
            } else {
                if(!this.map.getSource('cultural')){
                    this.map.addSource("cultural", {
                        type: "geojson",
                        data: this.culturalSearchReault
                    })
                }
                if (this.map.getLayer('nur_label')) {
                    this.map.removeLayer('nur_label');
                }
                if (this.map.getLayer('hotel_label')) {
                    this.map.removeLayer('hotel_label');
                }
                if (!this.map.getLayer("cultural_label")) {
                    this.map.addLayer({
                        id: "cultural_label",
                        type: "circle",
                        source: "cultural",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#cd8d1f',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
            }
        },
        // 获取柱状图
        getEnterpriseMode() {
            let myChart = echarts.init(document.getElementById("modelll"))
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                grid: {
                    top: "15%",
                    right: "3%",
                    left: "10%",
                    bottom: "20%",
                },
                xAxis: [
                    {
                        type: "category",
                        data: ["上游", "中游", "下游"],
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.12)",
                            },
                        },
                        axisLabel: {
                            margin: 10,
                            color: "#e2e9ff",
                            textStyle: {
                                fontSize: 14,
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "数量",
                        nameTextStyle: {
                            color: "#fff",
                        },
                        splitNumber: 5,
                        axisLabel: {
                            formatter: "{value}",
                            color: "#e2e9ff",
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.12)",
                            },
                        },
                    },
                ],
                series: [
                    {
                        type: "bar",
                        barWidth: "20px",
                        data: [
                            {
                                name: "上游产业链",
                                value: 200,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color:
                                                        "rgba(242,241,110,1)", // 0% 处的颜色
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        "rgba(242,241,110,0.2)", // 100% 处的颜色
                                                },
                                            ],
                                            false
                                        ),
                                        barBorderRadius: [30, 30, 30, 30],
                                        shadowColor: "rgba(242,241,110,1)",
                                        shadowBlur: 4,
                                    },
                                },
                            },
                            {
                                name: "中游产业链",
                                value: 50,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color:
                                                        "rgba(242,183,101,1)", // 0% 处的颜色
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        "rgba(242,183,101,0.2)", // 100% 处的颜色
                                                },
                                            ],
                                            false
                                        ),
                                        barBorderRadius: [30, 30, 30, 30],
                                        shadowColor: "rgba(242,183,101,1)",
                                        shadowBlur: 4,
                                    },
                                },
                            },
                            {
                                name: "下游产业链",
                                value: 260,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(0,219,177,1)", // 0% 处的颜色
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        "rgba(0,219,177,0.2)", // 100% 处的颜色
                                                },
                                            ],
                                            false
                                        ),
                                        barBorderRadius: [30, 30, 30, 30],
                                        shadowColor: "rgba(0,219,177,1)",
                                        shadowBlur: 4,
                                    },
                                },
                            },
                        ],
                    },
                ],
            }
            option.series[0].data[0].value = this.dataValue.upstreamValueSum
            option.series[0].data[1].value = this.dataValue.midstreamValueSum
            option.series[0].data[2].value = this.dataValue.downstreamValueSum
            myChart.setOption(option)
            window.addEventListener("resize", () => {
                myChart.resize()
            })
        },
        // 获取产值饼图
        getOutputValue() {
            let myChart = echarts.init(document.getElementById("outputValue"))

            let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                legend: {
                    orient: "vertical",
                    // x: 'right',
                    right: 30,
                    top: 10,
                    data: ["上游", "中游", "下游"],
                    textStyle: {
                        color: "#ffffff",
                    },
                },
                series: [
                    {
                        name: "数量",
                        type: "pie",
                        center: ["40%", "50%"],
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                        data: [
                            {
                                value: 348,
                                name: "上游",
                                itemStyle: {
                                    color: "#F2F16E",
                                },
                            },
                            {
                                value: 135,
                                name: "中游",
                                itemStyle: {
                                    color: "#CC496D",
                                },
                            },
                            {
                                value: 348,
                                name: "下游",
                                itemStyle: {
                                    color: "#1679D4",
                                },
                            },
                        ],
                    },
                ],
            }
            option.series[0].data[0].value = this.dataValue.upstreamCount
            option.series[0].data[1].value = this.dataValue.midstreamCount
            option.series[0].data[2].value = this.dataValue.downstreamCount
            myChart.setOption(option)
            window.addEventListener("resize", () => {
                myChart.resize()
            })
        },
        closeDialog() {
            this.sceanFlag = false
            this.sceanData = {}
        },
        closeEnterpriseDialog() {
            this.enterpriseFlag = false
            this.search = ""
            this.activeIndex = 0
            this.getScenList()
        },
        handleMarkerClick(e) {
            //   console.log(e);

            this.enterpriseFlag = true

            const features = this.map.queryRenderedFeatures(e.point, {
                layers: ["earthquake_label"],
            })
            // console.log(features)
            this.parkName = features[0].properties.city
            if (features.length > 0) {
                const enterList = JSON.parse(features[0].properties.comList)
                // console.log(enterList)
                // this.enterpriseList = JSON.parse(features[0].properties.test)
                this.enterpriseList = enterList
                this.search = this.enterpriseList[0].comName
                this.getScenList()
            }
        },
        handleTabClick(tab, event) {
            // console.log(tab.label)
            this.search = tab.label
            this.getScenList()
        },
        setMapTheme() {
            if (this.switchMap) {
                this.map.setStyle(
                    "mapbox://styles/mapbox/satellite-streets-v11"
                )
            } else {
                this.map.setStyle(
                    "http://106.15.47.224:8688/styles/newblue/style.json"
                )
            }
        },
        getScenList() {
            let productType = 0
            if (this.activeName === "产品") {
                productType = 1
            } else if (this.activeName === "项目") {
                productType = 2
            } else {
                productType = 3
            }
            let myData = {
                companyName: this.search,
                productName: "",
                productType: productType,
                type: this.isClick,
            }
            listProductByStream(myData).then((res) => {
                // console.log(res)
                this.productList = res.data.result.companyProductDTOList
                this.projectList = res.data.result.companyProjectDTOList
                this.needList = res.data.result.companyDemandDTOList
            })
        },
        showProductDetail(params) {
            this.proFlag = true
            if (!sessionStorage.getItem("user")) {
                this.$router.push({
                    path: '/login'
                })
            }
            this.enterpriseFlag = false
            // console.log(params)
            this.sceanFlag = true
            let myData = {
                companyProductId: params.companyProductId,
            }
            getProduct(myData).then((res) => {
                console.log(res)
                if (res && res.data.code === 200){
                    this.sceanData = res.data.result
                    this.sceanData.title = res.data.result.productName
                    this.sceanData.info = res.data.result.productIntroduce

                    this.srcList = []
                    if (res.data.result.imgList.length > 0) {
                        res.data.result.imgList.forEach((l) => {
                            this.srcList.push(l.imgUrl)
                        })
                        this.url = this.srcList[0]
                    } else {
                        this.srcList = []
                        this.url = ""
                    }
                }else{
                    console.log(res.data)
                }
            })
        },
        showProjectDetail(params) {
            this.proFlag = false
            if (!sessionStorage.getItem("user")) {
                this.$router.push({
                    path: '/login'
                })
            }
            this.enterpriseFlag = false
            // console.log(params)
            this.sceanFlag = true
            let myData = {
                companyProjectId: params.companyProjectId,
            }
            getCompanyProject(myData).then((res) => {
                if(res && res.data.code === 200) {
                    this.sceanData = res.data.result
                    this.sceanData.title = res.data.result.projectName
                    this.sceanData.info = res.data.result.projectIntroduce
                    this.srcList = []
                    if (
                        res.data.result.imgList &&
                        res.data.result.imgList.length > 0
                    ) {
                        res.data.result.imgList.forEach((l) => {
                            this.srcList.push(l.imgUrl)
                        })
                        this.url = this.srcList[0]
                    }
                }
            })
        },
        showNeedDetail(params) {
            this.proFlag = false
            if (!sessionStorage.getItem("user")) {
                this.$router.push({
                    path: '/login'
                })
            }
            this.enterpriseFlag = false
            // console.log(params)
            this.sceanFlag = true
            let myData = {}
            if (params.type === 1) {
                myData = {
                    companyProductDemandId: params.demandId,
                }
                getCompanyProductDemand(myData).then((res) => {
                    this.sceanData = res.data.result
                    this.sceanData.title = res.data.result.companyProductName
                    this.sceanData.info = res.data.result.demandInfo
                })
            } else if (params.type === 2) {
                myData = {
                    getCompanyProjectDemand: params.demandId,
                }
                getCompanyProjectDemand(myData).then((res) => {
                    this.sceanData = res.data.result
                    this.sceanData.title = res.data.result.companyProjectName
                    this.sceanData.info = res.data.result.demandInfo
                })
            } else {
                myData = {
                    companyOtherDemandId: params.demandId,
                }
                getCompanyOtherDemand(myData).then((res) => {
                    this.sceanData = res.data.result
                    this.sceanData.title = res.data.result.companyOtherName
                    this.sceanData.info = res.data.result.demandInfo
                })
            }
        },
        goLogin() {
            // this.$router.push({
            //     path: "/login",
            // })
            console.log(this.map.getSource("xuefu"))
            let _data = this.map.getSource("xuefu")._data;
            _data.features[0].properties.color = 'blue';
            this.map.getSource("xuefu").setData(_data);
        },
        changeActiveName(val) {
            this.getScenList()
        },
        logOut() {
            this.comName = null
            sessionStorage.clear()
            this.$router.go(0)
        },
        getQixiaDistribute() {
            const dottedLine = jiangsusheng
            // console.log("123")
            if (!this.map.getSource("dottedlines_label")) {
                this.map.addSource("dottedlines_label", jiangsusheng)
                // this.map.addSource('dottedlines_label_nj',nanjingDis);
            } else {
                return false
            }

            // console.log("456")
            // if (!this.map.getLayer('qixiaDis')){
            this.map.addLayer({
                id: "qixiaDis",
                type: "fill",
                source: "dottedlines_label",
                paint: {
                    "fill-color": "#ffffff",
                    "fill-opacity": 0.05,
                },
            })
            this.map.addLayer({
                id: "qixiaDisline",
                type: "line",
                source: "dottedlines_label",
                paint: {
                    "line-dasharray": [3, 2],
                    "line-width": 1.5,
                    "line-opacity": 1,
                    "line-color": "#ffffff",
                },
            })
        },
        handleXuefulu(){
            if(this.map.getSource('xuefu')){
                return false
            }
            this.map.addSource("xuefu", {
                type: "geojson",
                data: jurong
            })
            this.map.addLayer({
                id: "qixiaDis",
                type: "fill",
                source: "xuefu",
                paint: {
                    "fill-color": "#ffffff",
                    "fill-opacity": 0.05,
                },
            })
            this.map.addLayer({
                id: "qixiaDisline",
                type: "line",
                source: "xuefu",
                paint: {
                    "line-dasharray": [3, 2],
                    "line-width": 1.5,
                    "line-opacity": 1,
                    "line-color": "#ffffff",
                },
            })

            // this.checkLogin()
        },
        getCulturalJurongData(){
            listBaseInfo()
            .then((res) => {
                this.culturalTourismDTOList = res.data.result.culturalTourismDTOList
                this.culturalSearchReault.features = []

                this.culturalTourismDTOList.forEach((el) => {
                    this.culturalSearchReault.features.push({
                        "type": "Feature",
                        "id": el.culturalTourismId,
                        "properties": {
                            "id":el.culturalTourismId,
                            "city": el.park,
                            "mag": el.culturalTourismId,
                            "time": el.createDate,
                            "felt": el.address,
                            "tsunami": 0,
                            "comList": el
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [parseFloat(el.lng), parseFloat(el.lat)]
                        }
                    })
                })

                if(this.map.getSource('cultural')){
                    return false
                }
                this.map.addSource("cultural", {
                    type: "geojson",
                    data: this.culturalSearchReault
                })
                if (!this.map.getLayer("cultural_label")) {
                    this.map.addLayer({
                        id: "cultural_label",
                        type: "circle",
                        source: "cultural",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#cd8d1f',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
            })
        },
        getHotelData() {
            listBaseInfo()
            .then((res) => {
                this.hotelDTOList = res.data.result.hotelDTOList
                this.hotelDTOList.features = []

                this.hotelDTOList.forEach((el) => {
                    this.hotelSearchReault.features.push({
                        "type": "Feature",
                        "id": el.hotelId,
                        "properties": {
                            "id":1,
                            "city": el.name,
                            "mag": el.hotelId,
                            "time": el.createDate,
                            "felt": el.address,
                            "tsunami": el.beds,
                            "comList": el
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [parseFloat(el.lng), parseFloat(el.lat)]
                        }
                    })
                })
                if(this.map.getSource('hotel')){
                    return false
                }
                this.map.addSource("hotel", {
                    type: "geojson",
                    data: this.hotelSearchReault
                })
                if (!this.map.getLayer("hotel_label")) {
                    this.map.addLayer({
                        id: "hotel_label",
                        type: "circle",
                        source: "hotel",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#2d80de',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
            })
        },
        getNursingData() {
            listBaseInfo()
            .then((res) => {
                this.nursingHomeDTOList = res.data.result.nursingHomeDTOList
                this.nursingSearchReault.features = []

                this.nursingHomeDTOList.forEach((el) => {
                    this.nursingSearchReault.features.push({
                        "type": "Feature",
                        "id": el.nursingHomeId,
                        "properties": {
                            "id":1,
                            "city": el.name,
                            "mag": el.nursingHomeId,
                            "time": el.createDate,
                            "felt": el.address,
                            "tsunami": el.beds,
                            "comList": el
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [parseFloat(el.lng), parseFloat(el.lat)]
                        }
                    })
                })
                if(this.map.getSource('nursing')){
                    return false
                }
                this.map.addSource("nursing", {
                    type: "geojson",
                    data: this.nursingSearchReault
                })
                if (!this.map.getLayer("nur_label")) {
                    this.map.addLayer({
                        id: "nur_label",
                        type: "circle",
                        source: "nursing",
                        filter: ["!=", "cluster", true],
                        paint: {
                            "circle-color": '#009a83',
                            "circle-opacity": 0.6,
                            "circle-radius": 8,
                        },
                    })
                }
            })
        }
    },
}
</script>

<style scoped lang="css">
#map {
    width: 100%;
    height: 100%;
    position: relative;
}
.headerBox {
    position: absolute;
    left: 20px;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.switchBox {
    position: absolute;
    right: 20px;
    top: 50px;
    z-index: 2;
    color: #ffffff;
    margin-right: 10px;
    display: flex;
    align-items: center;
}
.switchTitle {
    font-size: 18px;
    margin-right: 10px;
}
.title {
    color: #ffffff;
    font-size: 30px;
    margin-left: 10px;
}
.bottomBox {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
}
.bottomNmae {
    color: #ffffff;
}
.bottomNmaeBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.itemsNav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    cursor: pointer;
}
.itemsNav i {
    color: #ffffff;
    font-size: 30px;
    margin-bottom: 10px;
}
.itemsNav .name {
    color: #ffffff;
    font-size: 20px;
    margin: 10px 0 0 0;
}
.activeitemsNav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    cursor: pointer;
}
.activeitemsNav i {
    color: #f9ce5f;
    font-size: 30px;
    margin-bottom: 10px;
}
.activeitemsNav .name {
    color: #f9ce5f;
    font-size: 20px;
    margin: 10px 0 0 0;
}
</style>
