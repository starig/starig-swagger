declare module'*.css' {
    const content: {[key: string]: any}
    export = content
}

declare module "*.svg" {
    const content: any;
    export default content;
}