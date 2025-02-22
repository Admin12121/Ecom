import { cn } from "@/components/costum/craft";
import React from "react";

const Icons = ({
  className,
  icons,
}: {
  className?: string;
  icons: string[];
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "esewa":
        return (
          <span key={iconName} data-payment-method="esewa" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 256 256"
            >
              <path
                fill="#64BC4B"
                d="M194 31.563A250 250 0 0 1 199 36l2.535 2.29C220.701 56.476 234.468 83.403 236 110c-1 1-1 1-2.753 1.12l-2.308-.006h-2.608l-2.835-.016-2.888-.005c-3.057-.005-6.114-.018-9.17-.03q-3.102-.009-6.202-.014c-5.078-.01-10.157-.03-15.236-.049v21h43c.952 3.808 1.028 4.93.18 8.527l-.614 2.63-.691 2.78-.708 2.873C227.96 169.352 218.47 186.6 204 202l-1.895 2.102c-19.502 20.783-49.066 31.82-77.097 33.027C93.06 237.715 64.059 225.632 41 204c-6.11-6.128-11.332-12.721-16-20l-1.965-3.004C8.207 156.89 2.912 126.066 8.902 98.38 13.53 79.149 20.845 61.939 34 47l2.078-2.477c18.064-20.987 44.544-34.98 72.106-38.242 31.802-2.343 60.605 5.332 85.816 25.282"
              />
              <path
                fill="#FAFCF9"
                d="M145.844 61.34C153.586 67.469 158.902 76.707 162 86c.128 2.674.044 5.321 0 8-2.83 1.547-5.33 2.4-8.5 2.965l-2.657.48-2.843.493-2.962.525c-8.034 1.405-16.088 2.645-24.16 3.818-4.884.712-9.755 1.495-14.628 2.281C97.856 105.91 89.443 107.01 81 108c.46 16.217 3.448 29.613 13 43l1.535 2.152c5.496 6.996 13.65 12.365 22.465 13.848 12.289 1.24 23.524.401 33.844-7.055 5.165-4.39 8.97-8.987 12.156-14.945l1.813-3 1.187-2 6 1c1.02 8.971-3.568 18.059-9 25-5.306 6.496-10.518 12.085-18 16l-2.766 1.473c-8.147 3.602-15.725 3.989-24.547 4.027l-3.36.019c-6.654-.103-12.188-.95-18.327-3.519l-3.152-1.254C77.025 174.842 68.22 159.94 62 143c-6.168-20.353-6.103-41.167 3.672-60.299C68.956 76.661 73.025 71.748 78 67l1.668-1.727c17.79-17.131 47-17.868 66.176-3.933"
              />
              <path
                fill="#62BC4A"
                d="M120.367 63.684C127.507 67.507 131.588 74.53 134 82c.438 3.938.438 3.938 0 7-2.87 1.914-4.024 2.35-7.284 2.854l-2.61.414-2.813.423-2.904.455c-3.066.48-6.134.948-9.201 1.416l-6.167.96q-5.673.882-11.348 1.754A692 692 0 0 0 81 99c-.91-9.149 1.385-16.805 6.645-24.363 8.475-10.159 19.56-14.754 32.722-10.953"
              />
              <path
                fill="#A0D691"
                d="m51 30 2 1-17 17-2-1c5.325-6.126 10.727-11.838 17-17"
              />
              <path
                fill="#79C563"
                d="M97 67c-1.59 4.136-4.605 7.232-8 10h-2c1.5-3.9 5.461-10 10-10"
              />
            </svg>
          </span>
        );
      case "visa":
        return (
          <span key={iconName}  data-payment-method="visa" aria-hidden="true">
            <svg
              width="26"
              height="16"
              viewBox="0 0 35 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6.4c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.184.436C3.04 0 4.16 0 6.4 0h22.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C35 3.04 35 4.16 35 6.4v11.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C31.96 24 30.84 24 28.6 24H6.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C0 20.96 0 19.84 0 17.6V6.4Z"
                fill="#fff"
              ></path>
              <path
                d="M6.4.5h22.2c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403.053.641.053 1.458.053 2.586v11.2c0 1.128 0 1.945-.053 2.586-.052.637-.152 1.057-.329 1.403a3.5 3.5 0 0 1-1.529 1.53c-.346.176-.766.276-1.402.328-.642.053-1.459.053-2.587.053H6.4c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.328a3.5 3.5 0 0 1-1.53-1.53c-.176-.346-.276-.766-.328-1.402C.5 19.544.5 18.727.5 17.6V6.4c0-1.128 0-1.945.053-2.586.052-.637.152-1.057.328-1.403a3.5 3.5 0 0 1 1.53-1.53c.346-.176.766-.276 1.403-.328C4.455.5 5.272.5 6.4.5Z"
                stroke="#343233"
                strokeOpacity=".04"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.625 16.258h-2.12l-1.59-6.066c-.076-.279-.236-.525-.471-.642A6.902 6.902 0 0 0 4.5 8.908v-.233h3.416a.89.89 0 0 1 .884.758l.825 4.376 2.119-5.134h2.061l-3.18 7.583Zm4.359 0H12.98l1.65-7.583h2.002l-1.65 7.583Zm4.24-5.482c.058-.409.412-.642.824-.642a3.732 3.732 0 0 1 1.944.35l.353-1.633A5.068 5.068 0 0 0 20.52 8.5c-1.944 0-3.358 1.05-3.358 2.508 0 1.11 1.002 1.692 1.709 2.042.765.35 1.06.584 1 .933 0 .525-.589.759-1.177.759a5.049 5.049 0 0 1-2.061-.467l-.354 1.633a5.779 5.779 0 0 0 2.18.409c2.179.058 3.533-.992 3.533-2.567 0-1.983-2.769-2.1-2.769-2.974ZM29 16.258l-1.59-7.583h-1.708a.886.886 0 0 0-.825.583l-2.944 7h2.061l.412-1.108h2.533l.235 1.108H29Zm-3.003-5.54.588 2.857h-1.649l1.06-2.858Z"
                fill="#172B85"
              ></path>
            </svg>
          </span>
        );
      case "mastercard":
        return (
          <span key={iconName}  data-payment-method="mastercard" aria-hidden="true">
            <svg
              width="26"
              height="16"
              viewBox="0 0 35 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6.4c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.184.436C3.04 0 4.16 0 6.4 0h22.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C35 3.04 35 4.16 35 6.4v11.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C31.96 24 30.84 24 28.6 24H6.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C0 20.96 0 19.84 0 17.6V6.4Z"
                fill="#fff"
              ></path>
              <path
                d="M6.4.5h22.2c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403.053.641.053 1.458.053 2.586v11.2c0 1.128 0 1.945-.053 2.586-.052.637-.152 1.057-.329 1.403a3.5 3.5 0 0 1-1.529 1.53c-.346.176-.766.276-1.402.328-.642.053-1.459.053-2.587.053H6.4c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.328a3.5 3.5 0 0 1-1.53-1.53c-.176-.346-.276-.766-.328-1.402C.5 19.544.5 18.727.5 17.6V6.4c0-1.128 0-1.945.053-2.586.052-.637.152-1.057.328-1.403a3.5 3.5 0 0 1 1.53-1.53c.346-.176.766-.276 1.403-.328C4.455.5 5.272.5 6.4.5Z"
                stroke="#343233"
                strokeOpacity=".04"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.75 17.157a6.75 6.75 0 0 1-4.426 1.649c-3.769 0-6.824-3.09-6.824-6.903C6.5 8.091 9.555 5 13.324 5a6.75 6.75 0 0 1 4.426 1.649A6.75 6.75 0 0 1 22.176 5C25.945 5 29 8.09 29 11.903c0 3.812-3.055 6.903-6.824 6.903a6.75 6.75 0 0 1-4.426-1.65Z"
                fill="#ED0006"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.75 17.157a6.92 6.92 0 0 0 2.398-5.254 6.92 6.92 0 0 0-2.398-5.254A6.75 6.75 0 0 1 22.176 5C25.945 5 29 8.09 29 11.903c0 3.812-3.055 6.903-6.824 6.903a6.75 6.75 0 0 1-4.426-1.65Z"
                fill="#F9A000"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.75 6.649a6.92 6.92 0 0 1 2.398 5.254 6.92 6.92 0 0 1-2.398 5.254 6.92 6.92 0 0 1-2.398-5.254 6.92 6.92 0 0 1 2.398-5.254Z"
                fill="#FF5E00"
              ></path>
            </svg>
          </span>
        );
      case "amex":
        return (
          <span key={iconName}  data-payment-method="amex" aria-hidden="true">
            <svg
              width="26"
              height="16"
              viewBox="0 0 35 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6.4c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.184.436C3.04 0 4.16 0 6.4 0h22.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C35 3.04 35 4.16 35 6.4v11.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C31.96 24 30.84 24 28.6 24H6.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C0 20.96 0 19.84 0 17.6V6.4Z"
                fill="#1F72CD"
              ></path>
              <path
                d="M6.4.5h22.2c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403.053.641.053 1.458.053 2.586v11.2c0 1.128 0 1.945-.053 2.586-.052.637-.152 1.057-.329 1.403a3.5 3.5 0 0 1-1.529 1.53c-.346.176-.766.276-1.402.328-.642.053-1.459.053-2.587.053H6.4c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.328a3.5 3.5 0 0 1-1.53-1.53c-.176-.346-.276-.766-.328-1.402C.5 19.544.5 18.727.5 17.6V6.4c0-1.128 0-1.945.053-2.586.052-.637.152-1.057.328-1.403a3.5 3.5 0 0 1 1.53-1.53c.346-.176.766-.276 1.403-.328C4.455.5 5.272.5 6.4.5Z"
                stroke="#343233"
                strokeOpacity=".04"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.681 8.5 3.5 15.747h3.808l.472-1.156h1.08l.472 1.156h4.191v-.882l.374.882h2.168l.374-.9v.9h8.718l1.06-1.126.992 1.126 4.478.01-3.191-3.613 3.19-3.644H27.28l-1.032 1.105-.962-1.105h-9.483l-.815 1.87-.833-1.87h-3.8v.852L9.93 8.5H6.68ZM19.7 9.529h5.006l1.532 1.703 1.58-1.703h1.531l-2.326 2.614 2.326 2.583h-1.6l-1.531-1.722-1.589 1.722h-4.929V9.529Zm1.237 2.026v-.95h3.123l1.363 1.518L24 13.649h-3.063v-1.036h2.73v-1.058h-2.73ZM7.418 9.529h1.856l2.11 4.914V9.53h2.034l1.63 3.523L16.55 9.53h2.023v5.2h-1.231l-.01-4.075-1.795 4.075h-1.102l-1.805-4.075v4.075h-2.532l-.48-1.166H7.023l-.479 1.165H5.187l2.231-5.199Zm.048 2.957.855-2.077.854 2.077H7.466Z"
                fill="#fff"
              ></path>
            </svg>
          </span>
        );
      case "paypal":
        return (
          <span key={iconName}  data-payment-method="paypal" aria-hidden="true">
            <svg
              width="26"
              height="16"
              viewBox="0 0 35 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6.4c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.184.436C3.04 0 4.16 0 6.4 0h22.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C35 3.04 35 4.16 35 6.4v11.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C31.96 24 30.84 24 28.6 24H6.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C0 20.96 0 19.84 0 17.6V6.4Z"
                fill="#fff"
              ></path>
              <path
                d="M6.4.5h22.2c1.128 0 1.945 0 2.586.053.637.052 1.057.152 1.403.328a3.5 3.5 0 0 1 1.53 1.53c.176.346.276.766.328 1.403.053.641.053 1.458.053 2.586v11.2c0 1.128 0 1.945-.053 2.586-.052.637-.152 1.057-.329 1.403a3.5 3.5 0 0 1-1.529 1.53c-.346.176-.766.276-1.402.328-.642.053-1.459.053-2.587.053H6.4c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.328a3.5 3.5 0 0 1-1.53-1.53c-.176-.346-.276-.766-.328-1.402C.5 19.544.5 18.727.5 17.6V6.4c0-1.128 0-1.945.053-2.586.052-.637.152-1.057.328-1.403a3.5 3.5 0 0 1 1.53-1.53c.346-.176.766-.276 1.403-.328C4.455.5 5.272.5 6.4.5Z"
                stroke="#343233"
                strokeOpacity=".04"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.9 15.241H8.344a.216.216 0 0 0-.213.182l-.63 3.99a.13.13 0 0 0 .129.15h.743a.216.216 0 0 0 .213-.183l.17-1.076a.216.216 0 0 1 .213-.183h.493c1.024 0 1.616-.496 1.77-1.479.07-.43.003-.767-.198-1.004-.221-.26-.613-.397-1.134-.397Zm.18 1.457c-.086.558-.512.558-.924.558H8.92l.164-1.042a.13.13 0 0 1 .129-.11h.107c.281 0 .546 0 .683.16.082.096.107.238.075.434Zm4.47-.018h-.745a.13.13 0 0 0-.128.11l-.033.208-.052-.076c-.161-.234-.52-.312-.88-.312-.823 0-1.526.623-1.663 1.498-.071.436.03.854.277 1.144.227.268.552.38.939.38.663 0 1.03-.427 1.03-.427l-.032.207a.13.13 0 0 0 .127.15h.671a.216.216 0 0 0 .214-.183l.403-2.55a.13.13 0 0 0-.128-.149Zm-1.038 1.45a.83.83 0 0 1-.84.711c-.217 0-.39-.07-.5-.2-.111-.131-.153-.317-.118-.524a.834.834 0 0 1 .835-.717c.211 0 .383.07.497.203.113.134.158.32.126.527Zm4.257-1.45h.749a.13.13 0 0 1 .106.204l-2.49 3.593a.216.216 0 0 1-.178.093h-.747a.13.13 0 0 1-.106-.204l.775-1.095-.824-2.42a.13.13 0 0 1 .123-.171h.735c.096 0 .18.063.208.154l.438 1.462 1.032-1.521a.217.217 0 0 1 .179-.095Z"
                fill="#253B80"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m25.885 19.412.639-4.062a.13.13 0 0 1 .127-.11h.72c.079 0 .14.072.127.15l-.63 3.99a.216.216 0 0 1-.213.182h-.642a.13.13 0 0 1-.128-.15Zm-4.89-4.171H19.44a.216.216 0 0 0-.213.182l-.63 3.99a.13.13 0 0 0 .128.15h.799a.151.151 0 0 0 .149-.129l.178-1.13a.216.216 0 0 1 .214-.183h.492c1.025 0 1.616-.496 1.77-1.479.07-.43.003-.767-.198-1.004-.22-.26-.613-.397-1.133-.397Zm.18 1.457c-.085.558-.511.558-.924.558h-.234l.165-1.042a.13.13 0 0 1 .127-.11h.108c.28 0 .546 0 .683.16.082.096.106.238.075.434Zm4.47-.018h-.744a.129.129 0 0 0-.128.11l-.033.208-.052-.076c-.161-.234-.52-.312-.88-.312-.823 0-1.526.623-1.663 1.498-.07.436.03.854.277 1.144.228.268.552.38.939.38.663 0 1.03-.427 1.03-.427l-.032.207a.13.13 0 0 0 .128.15h.67a.216.216 0 0 0 .214-.183l.403-2.55a.13.13 0 0 0-.129-.149Zm-1.038 1.45a.83.83 0 0 1-.84.711c-.216 0-.39-.07-.5-.2-.11-.131-.152-.317-.117-.524a.834.834 0 0 1 .834-.717c.212 0 .384.07.497.203a.642.642 0 0 1 .126.527Z"
                fill="#179BD7"
              ></path>
              <path
                d="m15.657 13.814.19-1.215-.425-.01h-2.034L14.8 3.625a.118.118 0 0 1 .115-.098h3.43c1.139 0 1.925.237 2.335.705.192.22.315.449.374.701.062.265.063.581.003.967l-.005.028v.247l.193.11c.162.085.29.184.39.296.164.188.27.426.315.709.046.29.031.636-.045 1.028-.088.45-.23.843-.421 1.164-.176.296-.401.541-.668.731-.254.181-.556.318-.898.406-.332.086-.71.13-1.124.13h-.267a.81.81 0 0 0-.521.192.808.808 0 0 0-.273.485l-.02.11-.338 2.14-.015.08c-.004.024-.01.037-.021.045a.057.057 0 0 1-.035.013h-1.648Z"
                fill="#253B80"
              ></path>
              <path
                d="M21.428 5.957c-.01.065-.022.132-.035.2-.453 2.323-2 3.126-3.977 3.126H16.41a.489.489 0 0 0-.483.413l-.515 3.268-.146.926a.257.257 0 0 0 .254.298h1.785a.43.43 0 0 0 .424-.362l.018-.09.336-2.133.021-.117a.429.429 0 0 1 .424-.363h.267c1.73 0 3.083-.702 3.48-2.734.164-.849.079-1.557-.359-2.056a1.705 1.705 0 0 0-.488-.376Z"
                fill="#179BD7"
              ></path>
              <path
                d="M20.954 5.768a3.571 3.571 0 0 0-.44-.097 5.59 5.59 0 0 0-.887-.065H16.94a.427.427 0 0 0-.424.363l-.572 3.622-.016.106a.489.489 0 0 1 .483-.414h1.006c1.977 0 3.524-.803 3.977-3.125l.035-.201a2.408 2.408 0 0 0-.474-.189Z"
                fill="#222D65"
              ></path>
              <path
                d="M16.516 5.968a.428.428 0 0 1 .423-.362h2.689c.318 0 .616.02.887.065a4.065 4.065 0 0 1 .44.097l.102.032c.133.044.257.096.371.157.135-.858 0-1.443-.465-1.972-.511-.582-1.435-.832-2.616-.832h-3.43a.49.49 0 0 0-.485.414l-1.428 9.056c-.028.18.11.341.29.341h2.118l.532-3.373.572-3.623Z"
                fill="#253B80"
              ></path>
            </svg>
          </span>
        );
    }
  };

  return (
    <div
      className={cn("w-full justify-end flex items-center gap-2", className)}
    >
      {icons.map((icon) => renderIcon(icon))}
    </div>
  );
};

export default Icons;
