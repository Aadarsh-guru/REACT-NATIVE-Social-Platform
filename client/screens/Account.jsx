import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FooterMenu from '../components/FooterMenu'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'

const Account = () => {

    const { auth, setAuth } = useAuth();
    const [name, setName] = useState(auth?.user.name)
    const [password, setPassword] = useState('')
    const [email] = useState(auth?.user.email)
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const { data } = await axios.put(`/auth/update-user`, { name, password, email })
            setLoading(false)
            let UD = JSON.stringify(data)
            setAuth({ ...auth, user: UD?.updateUser })
            alert(data?.message)
        } catch (error) {
            alert(error.response.data.message)
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <View style={styles.container} >
            <ScrollView>
                <View style={{ alignItems: 'center' }} >
                    <Image source={{
                        uri: 'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QDw0SEg0NEBIQDQ8PDw8PDQ8PDxIPFREWFhUSFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNyguLisBCgoKDg0OGhAQFi0dIB0rLSstLS4rKy0tKy0tLS0tLS0tLS0tLSstLS0tLS0tKy0rLS0rKy0tLS0tLS0tKy0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQQDBQYCB//EAEMQAAICAAIGBwYEAgYLAAAAAAABAgMEEQUGITFBURJhcYGRobETIjJywdEjQlJiFFNDY3OCkvEkMzREg6KywtLh8P/EABoBAQEAAwEBAAAAAAAAAAAAAAABAgMFBAb/xAAvEQEAAgIBAgMHBAIDAQAAAAAAAQIDEQQhMQUSQRMiMlFhcZEUQqGxM4EjUvDR/9oADAMBAAIRAxEAPwD7gAAZgMwADMAAAAEBDmlvaRdTJtjeIj1vuLFJTbw8V+3zMvZym0PFP9PmPZ/U8x/FPl5j2f1PMn+K/b5j2Zt7WJj1+BPJK7e42J8UY6mDb0RQAAQDMAAzAZgAAEgQwAAAAAAAIfNgYp4hcNvoZxSWMywSuk+OS6jOKRCbeDJEFVIEBEgAICgR7jbJce57TGawu2eGIT3rI1zjXbMnn2GDJIAAAAAACAkCAAAAAAAYrLkut8jKK7SZ0rTsct/gbYrEMdvBkgACgAIkCAAUCAAAFeoza3MkxEm9LNd6ex7PQ1TTTKJZjBQAAAAAABgAAAABWtv4LxNlaessZlXNjEKAAKAAiQIABUhEASBAUABADNVflse7nyNdqfJlErSZqZJAAACAkCAAAABUuuz2Lcba10xmWE2MQAACgAiPF10YRcpSjGK3yk0l4mVYm06rG0tMVjc9GixmtuHhmoRna+aXQh4vb5Hux+HZbfF0eO/Ox17dWts1yt/LRUvmlKXpkemPDK+tmifELelUQ1yu401Psc4/VlnwynpaSPEL+tWwwmt9MsvaVzr61+JFeGT8jzZPDclfhnf8N1OfSfijTfYXE12x6UJxnHnF5+PI8F6WpOrRp7K3reN1nbKRkBQIAAAVlpt6PYYWrtYlbT4mlkkAAAAGAAAVsRbw8TZSvrLGZVzaxAAAKAAjVac03Xhll8djWcYZ7v3S5L1PRxuLbPPyh58/Jri+suFx+Ptvl0rJuT4LdGPUlwO/iwUxRqsOPky2yTu0qxtawAAAy4XE2VSUq5yhJcVxXJriuowyYq5I1aNsqXtSd1nTt9AawxxGUJ5Qty4fDP5eT6jhcrh2xe9XrDr8flxk6W6S3h43rAAAKBADNRblv3ehrvXfVlErZqZAACQIAAYr7Ml1vd9zKsblJnSmbmAUAAUABFDTek44apz2OT92uL4y6+pG7j4JzX8sdvVpz5oxU3Peez5zfdKcpTnJylJ5yb3tn0lKVpWK19HDtabTuXgzYgAAAAEExk0002mmmmnk01uaJaImNSsTqdu/1a0v/EV5Sf4taSn+5cJ/frPnuZxvY26dpdri5/a11PeG4PI9IVQIASBAFrDWZ7Hw3dhpvXXVnEs5goAAMCHzYFKyfSefh2G+sahhLwZIAAoACBB8+1ox/tsRJJ+7VnXHlmn7z8fRH0HBw+zx7nvPX/44vLy+fJr0js1B7nlAAAAAAAALuh8c8PfXZwTymucHv+/cefk4fa45r+Pu3YMns7xZ9LTPmne3sAAAAUCJjLJpkmNwQvxlmk+B52xIEgQBhxM9mXP0M6R1YzKobmIAABQIAYcdf7Oq2f6K5S70s0ZY6+a0V+bDJby1mfk+W5n1URro+e2FAAAAAAAAAwPo+rmI9phaG9rUOg+2D6P0PmeVTyZbQ7vGv5scS2JobwAFAgAAsYWe9d5qyR6soWTWySBDApXyzk+rYbqRqGEy8GaIABQIAANdrG8sJiP7PLxkj0cSN5q/dp5P+Kz5wfSOCFAAAAAAAAAQh3mpj/0Rf2s0vI4HiH+eftDs8L/E3h4nrAoEAAEhUwlk0+RjMbgX0aGaQPNjyTfJFjrKS15vYBQCgQAAAqnpmrp4bER4uqeXalmvQ24LeXJWfq1Zo82OY+j5mfTvnwoAAAAAAAACD6DqnV0cJVn+Zzn3OTy8kj57nW82afo7fErrFDbnkeoCAAAFAAReol7q8DRaNSzh7MVYsU/d7WZU7pKmb2IACAAAFAgB8y0tg3TfbXlsUm4dcHtj5H0vGye0xxb/ANtwM2OaXmqoehqAAAAAAAAMmHolZOEI7ZTkortZhe8UrNp9GVazadR6vqGHpUIQgt0IxiuxLI+WtabTMz6voa18sRHyZCKAAAUABEgWcI9jXWasjKqwa2Sti38PebMfdjKsbUAgAABQIACDntbtFO2Ctgs51r3kt8q9/it/idDgcj2dvJbtLxczD56xaO8OIO65AUAAAAAAEHWam6Kf+0TXBqlPwc/ou84/iPI3/wAVZ+7p8HDr/kmPs6w5bogAAFAARIADNhN77DXkZQtGpkrYvfHvNmNjZXNrEAAAoEAAAKEHIax6uNOVtEc1vnVFbVzcVy6v/l1uHze1Mk/aXL5PE1u9HLHXhzgoAAAAg3+r2r0rnGy1ONS2pPZKz7R6zm8vmxT3KTuf6e3jcSb+9bpDuIxSSSSSSSSWxJI4vfu6+ojpCQAAKAAiQAEBWbC/F3M15OywtmpkrYveuxmzGxsrm1iAAoEAAAKAAiSSNPpXV6i/OSXs7H+eCWTfOUePqevBzMmLp3j5PNl4lMnXtLmcZqvia8+jGNq5weT74v6ZnTx+IYrd9w59+Fkr26tZZgLo/FRcu2qf2PVGfHbtaPy0TivHesohgrnupufZVN/Qs5scd7R+SMd5/bLYYTVrFWb61Wudjy8lmzzZOfhr2nf2bqcPLb006TReq9NWUp/izW33llBPqjx7zm5+fkydK+7D34uHSnW3vS3p4XrCgACgAIAAAUCM2F+LuZhk7LC4aWati/y95sxsZVjaxAqQiAAAKAAgAABQIkABAUCAEgQFAAQAAAoEAM+EXvPsNeRlVaNTJixS93vM6d0lTNzECJAgAFAAQAEEjcKw3Ymuv47IQ+acY+plWtrdo2wtesd5UrdP4SO/EQfyqU/+lM3xxM0/slqtycUd7MD1owf8yb7Kp/Y2foM//X+YYfrMXz/hC1pwf8ya7ap/YfoM/wAv5g/W4fn/AAz1aw4OX+8RXzRnH1RhPDzx+xnHKwz2su0Yyqz4La5/LOMvQ0Wx2r8UTDZXJW3aWYwZ6ABVAgAABQIASBYwi3s1ZJZVWTWrxZHNPsLHSSVA9DAAAAoACBBUx+k6aF+JZGL4R3yf91bTbjw5MnwV215MtKfFLncbri9qpq/v27/8K+50cfhm+t7fh4cnP/6Q0eK01ibM+lfPJ/li+gv+XI9+PiYadq/l5L8jJfvKg+b2vnxPREa7NMzsGkABQJoBoXcLpbEVfBfYlyb6UfCWaNF+Liv3rDbXPkr2lusFrhNZK2qMlxlX7svB7H5HhyeGR+y35eynPtHxQ6PR+mMPfshYul+iXuz8Hv7jnZePkxfFV7ceemT4ZXjQ3BQCgQAAALuHXurxNF53LOGQxUYFG2OUn4o31nowl4MkAoACK+NxtdMelZNRXDm3yS3tmePHfJOqxthkyVxxu0uR0rrVbZnGlOqP6t9j+ke7xOvg8OrXrk6z8nMzc21ulOkOenJttttt72222+tnSiIiNQ8UzMzuUBAoAAAAAAAAABNG280XrNdTkp53Q/c/fS6pce85+fgUv1p7s/w9mHmXp0t1h2OjtJU3x6Vc8/1Reyce1HIy4b4p1aHUxZqZI3WVs0tgUAAV6jHNpcyTPQX0edmkCAMGKhmk+RnjljKqbkABEabTun4YfOEcp25fDn7sOuX2PZxuHbNO56Q8vI5VcUa7y4fGYuy6bnZNyk+e5LklwR3cWKuOuqxpyMmS153ZgNjAKAAAAAAAAAAAAACDJh7p1yU4ScZLdJPJmN8dbx5bRuGVbTWd1nTtNA6yRuyhblCzdGW6E/s+r/I4nK4M4/ep1j+nV4/Li/u26S6A572hVALGFhtb7jVkn0WFk1skgQwIaz7AKM45No9ETuGEvIRzmsmsPss6qmnZunPeq+r5vQ6PD4ftPfv2/t4eTyorHlp3cW2222222229rb5s7kRERqHK2gqAAAAAAAAAAAAAAAAAAIOs1b1i+Gm+XJV2vyjJ+jOPzOFr38cfeHT4vK/ZeftLrDlOilLPYhM6F6EckkjRM7bIeiCQIAAYcTXms1w9DOk66JLl9Z9N+wj7Otr2s1v/AJcf1dvLxOnwuL7WfNb4Y/l4eVyPZx5a95cI3v457W3tb62d6I040zvqFAoAAAAAAAAAAAAAAAAAAASR2OqmnOnlRZL3ksqpvfJL8r615nF53E8n/JSOnrDq8Pk+b3Lf6dhhq+Pgci8+jo1WDWyAABgADA+f666ElXZLERzcLJfibW+hP/xflu5He8N5cWr7K3eO31hx+dx5rPtI7OWOu54UAAAAAAAAAAAAAAAAAAAAEG81V0LLE2qT6UaqpJykm03JbVCL59fA5/P5cYaeWOsy9fEwTkt5vSH0xHzTupAASBDAAAPF1UZRcZRUlJNSi1mmnvzLEzWdx0mEmImNS+a6zavywsulHOVMn7st7g/0y+j4n0nC5sZo8tvi/tw+VxpxTuO39NGdB5AoAAAAAAAAAAAAAAAAAAg2egdC2Yuzox92EcvaWZbEuS5y6jycvl1wV+cz2h6OPx5zT9H07BYSFNca64qMYrJL1b5vrPmMmS2S02tO5l3qUikahYMGQAAkCGAAAAMd1MZxlGUVKMllKMlmmuRa2ms7idTCTETGpfPtZNVp0dKypOdW9rfOtdfOPX48z6Dh+IRk93J0n+3G5PDmnvU7f05s6m3hCgAAAAAAAAAAAAAAAJsbvV7V2zFNSecKU9s2tsuahz7dy8jwcvnVwdK9bPXx+JbL1npD6NgsJXTCNdcFGMVsS823xfWfOZMlslvNadzLt0pFI1ELBgyAABASBDAAAAACMgOW09qhC3Oyno1T3uG6uT/7X5dR0+L4lbH7uTrH8vByOFF+tOkuHxmDtpm4WVyhLk1sfWnua7DvYs1Mseak7cm+O1J1aNMBsYBQAAAAAAAAAABBkoonZJRhCU5PdGKbZjfJWkbtOoZVrNp1EbdnoLU1JqeJyk96pTzivnfHsWztOHyvFJt7uLp9XU4/AiPeyfh2EYpJJJJJZJJZJI5EzM9ZdGI09BQAAAICQIAAAAAAAAr4zB1XRcLK4zjykuPNPh2meO9sc+ak6lhelbxq0bclpTUje8PZl/V2vZ2KS+vidbB4tMdMsb+sOfl8P9cc/wCnLY/Rl9DyspnD92WcP8S2HVxcnFlj3Lbc/Jhvj+KFQ3tQUAAAAAAEGfB4G655VVTs+WOzve5d5qyZ8eOPftpnTHe/SsbdPozUicsnfYoL9FbUpd8ty7szl5/Fo7Yo/wBy6GLw+e+SXX6P0bTh49GquMFxe+T7ZPazkZc18s7vO3Rx4qY41WNLhqbAAAAAAAAAAAAAAAAAAAQ48MvEDU43VvB276Ixb/NXnW+33dj7z1Y+bnx9It+erz34uK/erT4nUSp/6vEWR6pxjNeWR7aeL3j4qxP8PLbw6s/DaWvt1GxC+G6iXzdOHomeivi+P1rMfhqnw6/paFd6l43+ofZa/qjZHiuD6/hr/QZfoLUvG8qV/wAX/wBCfFcH1/B+gy/Rmq1GxL+K3Dx7HOT9Ea58XxelZn8M48Oyesw2GH1Eh/SYmcuqEFDzbZov4vb9tNfdur4dX91m3weq2Dr/AKFTa42tz8ns8jx5OfyL/u19uj004mKv7W4hWkkoxUUtySyS7EeSZmesvREa7PRFAAAAAAAAAEgAAAAAAAAAAABDAEhJCrAFSEQwT2ESUgQgSVQAAAAAAAAAAAf/2Q=='
                    }}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 100
                        }}
                    />
                </View>
                <Text style={{ color: 'red', fontSize: 13, textAlign: 'center' }} >Currently you can update your name and password</Text>
                <View style={styles.inputContainer} >
                    <Text style={styles.inputText} >Name</Text>
                    <TextInput style={styles.inputBox} onChangeText={(e) => setName(e)} value={name} />
                </View>
                <View style={styles.inputContainer} >
                    <Text style={styles.inputText} >Email</Text>
                    <TextInput style={styles.inputBox} value={auth?.user.email} editable={false} />
                </View>
                <View style={styles.inputContainer} >
                    <Text style={styles.inputText} >Password</Text>
                    <TextInput style={styles.inputBox} onChangeText={(e) => setPassword(e)} secureTextEntry={true} value={password} />
                </View>
                <View style={styles.inputContainer} >
                    <Text style={styles.inputText} >Role</Text>
                    <TextInput style={styles.inputBox} value={auth?.user.role} editable={false} />
                </View>
                <View style={{ alignItems: 'center' }} >
                    <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn} >
                        <Text style={styles.updateBtnText}>{loading ? 'Please wait..' : 'Update Profile'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                <FooterMenu />
            </View>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
        marginTop: 40
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        fontWeight: 'bold',
        width: 70,
        color: 'gray'
    },
    inputBox: {
        width: 250,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    updateBtn: {
        backgroundColor: 'black',
        color: 'white',
        height: 40,
        width: 250,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    updateBtnText: {
        color: '#ffffff',
        fontSize: 16,
    }
})