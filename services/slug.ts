export default function slug(name: string) {
  return name.replace(/\W/g, "-");
}
