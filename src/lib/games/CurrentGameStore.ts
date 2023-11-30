import { writable } from "svelte/store";
import { ECurrentGameStatus, type CurrentGameStoreInterface } from "./types";
import { PocketbaseInstance } from "../pocketbase";
import { NewsStore } from "./news";
import { DownloaderStore } from "../downloader";
import { getStore, parseDownloadsManifest } from "../helpers";
import { BadgeType, type GameEntity } from "../types";
import { join } from "@tauri-apps/api/path";
import { Command, type ChildProcess, Child } from "@tauri-apps/api/shell";

// StoreClass
class CurrentGameStoreClass {
    public subscribe;
    private update;

    private childProcess?: Child;

    constructor() {
        // @ts-ignore
        const { subscribe, update } = writable<CurrentGameStoreInterface>(null);
        
        this.subscribe = subscribe;
        this.update = update;
    }

    async fetchById(id: string) {
        return new Promise((resolve, reject) => {
            PocketbaseInstance.collection("games").getOne(id, {
                expand: "currentDownloadManifest,news,currentDownloadManifest.files"
            })
                .then(async (response) => {
                    // @ts-ignore
                    const gameData: GameEntity = response;

                    this.update(() => {
                        return {
                            ...gameData,
                            status: ECurrentGameStatus.IDLE,
                            links: [
                                {
                                    text: "Діскорд-сервер",
                                    url: "/"
                                },
                                {
                                    text: "Правила",
                                    url: "/"
                                }
                            ],
                            badges: [
                                {
                                    type: BadgeType.STATIC,
                                    text: "Відкритий тест"
                                }
                            ]
                        };
                    })

                    // Initializing Downloader
                    await DownloaderStore.loadSavedData();
                    if (response.expand?.currentDownloadManifest != null) {
                        await DownloaderStore.initializeWithManifest(parseDownloadsManifest(response.expand?.currentDownloadManifest));
                    } else {
                        await DownloaderStore.initialize();
                    }

                    // Populating news store
                    NewsStore.addPosts(response.expand?.news);

                    resolve(gameData);
                }).catch((error) => reject(error));
        });
    }

    async launch() {
        const downloaderStore = await getStore(DownloaderStore);

        const version = "1.19.2-forge-43.3.0"; // full version id, like 1.13, or your forge version like, 1.13-forge-<someForgeVersion>
        const javaPath = await join(downloaderStore.currentManifest?.path!, "jdk-18.0.2.1", "bin", "javaw.exe"); // java executable path
        const gamePath = downloaderStore.currentManifest?.path!; // .minecraft path

        console.log("Starting sidecar...");

        // this.childProcess =
        const output = await (new Command("javaw", [
            '-Xms4000M',
            '-Xmx8000M',
            // '-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump',
            // '-Dos.name=Windows 10',
            // '-Dos.version=10.0',
            '-Djava.library.path=C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\versions\\1.19.2-forge-43.3.0\\1.19.2-forge-43.3.0-natives',
            '-Dminecraft.launcher.brand=Launcher',
            '-Dminecraft.launcher.version=0.0.1',
            '-cp',
            'C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\mojang\\logging\\1.0.0\\logging-1.0.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\mojang\\blocklist\\1.0.10\\blocklist-1.0.10.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\mojang\\patchy\\2.2.10\\patchy-2.2.10.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\github\\oshi\\oshi-core\\5.8.5\\oshi-core-5.8.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\java\\dev\\jna\\jna\\5.10.0\\jna-5.10.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\java\\dev\\jna\\jna-platform\\5.10.0\\jna-platform-5.10.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\slf4j\\slf4j-api\\1.8.0-beta4\\slf4j-api-1.8.0-beta4.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\apache\\logging\\log4j\\log4j-slf4j18-impl\\2.17.0\\log4j-slf4j18-impl-2.17.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\ibm\\icu\\icu4j\\70.1\\icu4j-70.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\mojang\\javabridge\\1.2.24\\javabridge-1.2.24.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\sf\\jopt-simple\\jopt-simple\\5.0.4\\jopt-simple-5.0.4.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\io\\netty\\netty-common\\4.1.77.Final\\netty-common-4.1.77.Final.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\io\\netty\\netty-buffer\\4.1.77.Final\\netty-buffer-4.1.77.Final.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\io\\netty\\netty-codec\\4.1.77.Final\\netty-codec-4.1.77.Final.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\io\\netty\\netty-handler\\4.1.77.Final\\netty-handler-4.1.77.Final.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\io\\netty\\netty-resolver\\4.1.77.Final\\netty-resolver-4.1.77.Final.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\io\\netty\\netty-transport\\4.1.77.Final\\netty-transport-4.1.77.Final.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\io\\netty\\netty-transport-native-unix-common\\4.1.77.Final\\netty-transport-native-unix-common-4.1.77.Final.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\io\\netty\\netty-transport-classes-epoll\\4.1.77.Final\\netty-transport-classes-epoll-4.1.77.Final.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\google\\guava\\failureaccess\\1.0.1\\failureaccess-1.0.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\google\\guava\\guava\\31.0.1-jre\\guava-31.0.1-jre.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\apache\\commons\\commons-lang3\\3.12.0\\commons-lang3-3.12.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\commons-io\\commons-io\\2.11.0\\commons-io-2.11.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\commons-codec\\commons-codec\\1.15\\commons-codec-1.15.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\mojang\\brigadier\\1.0.18\\brigadier-1.0.18.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\mojang\\datafixerupper\\5.0.28\\datafixerupper-5.0.28.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\google\\code\\gson\\gson\\2.8.9\\gson-2.8.9.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\mojang\\authlib\\3.11.49\\authlib-3.11.49.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\apache\\commons\\commons-compress\\1.21\\commons-compress-1.21.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\apache\\httpcomponents\\httpclient\\4.5.13\\httpclient-4.5.13.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\commons-logging\\commons-logging\\1.2\\commons-logging-1.2.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\apache\\httpcomponents\\httpcore\\4.4.14\\httpcore-4.4.14.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\it\\unimi\\dsi\\fastutil\\8.5.6\\fastutil-8.5.6.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\apache\\logging\\log4j\\log4j-api\\2.17.0\\log4j-api-2.17.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\apache\\logging\\log4j\\log4j-core\\2.17.0\\log4j-core-2.17.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\lwjgl\\lwjgl\\3.3.1\\lwjgl-3.3.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.1\\lwjgl-jemalloc-3.3.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.1\\lwjgl-openal-3.3.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.1\\lwjgl-opengl-3.3.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.1\\lwjgl-glfw-3.3.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.1\\lwjgl-stb-3.3.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.1\\lwjgl-tinyfd-3.3.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\mojang\\text2speech\\1.16.7\\text2speech-1.16.7.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\cpw\\mods\\securejarhandler\\2.1.4\\securejarhandler-2.1.4.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\ow2\\asm\\asm\\9.5\\asm-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\ow2\\asm\\asm-commons\\9.5\\asm-commons-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\ow2\\asm\\asm-tree\\9.5\\asm-tree-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\ow2\\asm\\asm-util\\9.5\\asm-util-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\ow2\\asm\\asm-analysis\\9.5\\asm-analysis-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\accesstransformers\\8.0.4\\accesstransformers-8.0.4.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\antlr\\antlr4-runtime\\4.9.1\\antlr4-runtime-4.9.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\eventbus\\6.0.3\\eventbus-6.0.3.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\forgespi\\6.0.0\\forgespi-6.0.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\coremods\\5.0.1\\coremods-5.0.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\cpw\\mods\\modlauncher\\10.0.8\\modlauncher-10.0.8.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\unsafe\\0.2.0\\unsafe-0.2.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\electronwill\\night-config\\core\\3.6.4\\core-3.6.4.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\com\\electronwill\\night-config\\toml\\3.6.4\\toml-3.6.4.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\apache\\maven\\maven-artifact\\3.8.5\\maven-artifact-3.8.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\jodah\\typetools\\0.8.3\\typetools-0.8.3.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecrell\\terminalconsoleappender\\1.2.0\\terminalconsoleappender-1.2.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\jline\\jline-reader\\3.12.1\\jline-reader-3.12.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\jline\\jline-terminal\\3.12.1\\jline-terminal-3.12.1.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\spongepowered\\mixin\\0.8.5\\mixin-0.8.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\org\\openjdk\\nashorn\\nashorn-core\\15.3\\nashorn-core-15.3.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\JarJarSelector\\0.3.16\\JarJarSelector-0.3.16.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\JarJarMetadata\\0.3.16\\JarJarMetadata-0.3.16.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\cpw\\mods\\bootstraplauncher\\1.1.2\\bootstraplauncher-1.1.2.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\JarJarFileSystems\\0.3.16\\JarJarFileSystems-0.3.16.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries\\net\\minecraftforge\\fmlloader\\1.19.2-43.3.0\\fmlloader-1.19.2-43.3.0.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\versions\\1.19.2\\1.19.2.jar',
            '-Djava.net.preferIPv6Addresses=system',
            '-DignoreList=bootstraplauncher,securejarhandler,asm-commons,asm-util,asm-analysis,asm-tree,asm,JarJarFileSystems,client-extra,fmlcore,javafmllanguage,lowcodelanguage,mclanguage,forge-,1.19.2.jar',
            '-DmergeModules=jna-5.10.0.jar,jna-platform-5.10.0.jar',
            '-DlibraryDirectory=C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries',
            '-p',
            'C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries/cpw/mods/bootstraplauncher/1.1.2/bootstraplauncher-1.1.2.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries/cpw/mods/securejarhandler/2.1.4/securejarhandler-2.1.4.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries/org/ow2/asm/asm-commons/9.5/asm-commons-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries/org/ow2/asm/asm-util/9.5/asm-util-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries/org/ow2/asm/asm-analysis/9.5/asm-analysis-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries/org/ow2/asm/asm-tree/9.5/asm-tree-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries/org/ow2/asm/asm/9.5/asm-9.5.jar;C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\libraries/net/minecraftforge/JarJarFileSystems/0.3.16/JarJarFileSystems-0.3.16.jar',  
            '--add-modules',
            'ALL-MODULE-PATH',
            '--add-opens',
            'java.base/java.util.jar=cpw.mods.securejarhandler',
            '--add-opens',
            'java.base/java.lang.invoke=cpw.mods.securejarhandler',
            '--add-exports',
            'java.base/sun.security.util=cpw.mods.securejarhandler',
            '--add-exports',
            'jdk.naming.dns/com.sun.jndi.dns=java.naming',
            '-XX:+UnlockExperimentalVMOptions',
            '-XX:+UseG1GC',
            '-XX:G1NewSizePercent=20',
            '-XX:G1ReservePercent=20',
            '-XX:MaxGCPauseMillis=50',
            '-XX:G1HeapRegionSize=32M',
            'cpw.mods.bootstraplauncher.BootstrapLauncher',
            '--username',
            'Steve',
            '--version',
            '1.19.2-forge-43.3.0',
            '--gameDir',
            'C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game',
            '--assetsDir',
            'C:\\Users\\Admin\\Documents\\Projects\\cit-server\\steampunk\\installer\\game\\assets',
            '--assetIndex',
            '1.19',
            '--uuid',
            '482430b6a0f247f19a09848cab131aa5',
            '--accessToken',
            '0ad7c69c12c142bca37e9aae709390fb',
            '--clientId',
            '${clientid}',
            '--xuid',
            '${auth_xuid}',
            '--userType',
            'Mojang',
            '--versionType',
            'release',
            '--launchTarget',
            'forgeclient',
            '--fml.forgeVersion',
            '43.3.0',
            '--fml.mcVersion',
            '1.19.2',
            '--fml.forgeGroup',
            'net.minecraftforge',
            '--fml.mcpVersion',
            '20220805.130853'
        ])).execute();

        console.log(output);
    }
}

// Instance of this store class
export const CurrentGameStore = new CurrentGameStoreClass();